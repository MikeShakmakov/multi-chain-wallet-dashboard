import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChainsGQL } from './chains.gql.setvice';

@Injectable()
export class ChainsEntityService {
  private readonly chainsGql = inject(ChainsGQL);

  readonly chains = toSignal(this.chainsGql.get(), { initialValue: [] });
}
