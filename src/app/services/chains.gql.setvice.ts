import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { ChainDto } from '../interfaces/chain.interface';
import { GET_CHAINS } from './get-chains.const';

@Injectable({
  providedIn: 'root',
})
export class ChainsGQL {
  constructor(private apollo: Apollo) {}

  get() {
    return this.apollo.watchQuery<{ chains: ChainDto[] }>({
      query: GET_CHAINS,
    }).valueChanges.pipe(
      map(({ data }) => data?.chains ?? []),
    );
  }
}
