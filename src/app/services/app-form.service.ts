import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppFormService {
  private readonly formBuilder = inject(FormBuilder);
  private readonly solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  private readonly evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  readonly form: FormGroup<{ chain: FormControl<string | null>; address: FormControl<string | null> }> = this.formBuilder.group({
    chain: this.formBuilder.control('', Validators.required),
    address: this.formBuilder.control(''),
  });

  constructor() {
    this.form.controls.chain.valueChanges.subscribe((value) => this.updateAddressValidators(value));
  }

  private updateAddressValidators(chain: string | null): void {
    if (chain) {
      if (chain.toLowerCase() === 'solana') {
        this.form.controls.address.setValidators([Validators.pattern(this.solanaAddressRegex), Validators.required]);
      } else {
        this.form.controls.address.setValidators([Validators.pattern(this.evmAddressRegex), Validators.required]);
      }
    } else {
      this.form.controls.address.clearValidators();
    }

    this.form.controls.address.updateValueAndValidity();
  }
}
