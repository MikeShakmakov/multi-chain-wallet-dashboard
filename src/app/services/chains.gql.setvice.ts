import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { ChainDto } from '../interfaces/chain.interface';
import { GET_CHAINS } from './get-chains.const';

const isChainDto = (value: unknown): value is ChainDto => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const chain = value as {
    id?: unknown;
    name?: unknown;
    nativeCurrency?: { symbol?: unknown } | null;
  };

  return (
    typeof chain.id === 'string' &&
    typeof chain.name === 'string' &&
    typeof chain.nativeCurrency?.symbol === 'string'
  );
};

@Injectable({
  providedIn: 'root',
})
export class ChainsGQL {
  constructor(private apollo: Apollo) {}

  get() {
    return this.apollo.watchQuery<{ chains: ChainDto[] }>({
      query: GET_CHAINS,
    }).valueChanges.pipe(
      map(({ data }): ChainDto[] => (data?.chains ?? []).filter(isChainDto)),
    );
  }
}
