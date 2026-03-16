import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChainDto } from '../interfaces/chain.interface';

@Injectable()
export class AppFormService {
  private readonly formBuilder = inject(FormBuilder);
  private readonly solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  private readonly evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  private readonly destroyRef = inject(DestroyRef);

  readonly form: FormGroup<{
    chain: FormControl<ChainDto | null>;
    address: FormControl<string | null>;
  }> = this.formBuilder.group({
    chain: this.formBuilder.control<ChainDto | null>(null, Validators.required),
    address: this.formBuilder.control<string | null>(null),
  });

  constructor() {
    this.form.controls.chain.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.updateAddressValidators(value));
  }

  private updateAddressValidators(chain: ChainDto | null): void {
    if (chain) {
      if (chain.id === 'solana') {
        this.form.controls.address.setValidators([
          Validators.pattern(this.solanaAddressRegex),
          Validators.required,
        ]);
      } else {
        this.form.controls.address.setValidators([
          Validators.pattern(this.evmAddressRegex),
          Validators.required,
        ]);
      }
    } else {
      this.form.controls.address.clearValidators();
    }

    this.form.controls.address.updateValueAndValidity();
  }
}
