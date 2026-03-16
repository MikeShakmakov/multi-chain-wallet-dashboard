import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChainDto } from '../interfaces/chain.interface';
import { ChainsGQL } from './chains.gql';

@Injectable({
  providedIn: 'root',
})
export class ChainsEntityService {
  private readonly chainsGql = inject(ChainsGQL);

  readonly chains: Signal<ChainDto[]> = toSignal(this.chainsGql.get(), { initialValue: [] });
}
