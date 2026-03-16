import { formatCurrency } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { delay, filter, map } from 'rxjs';
import { PortfolioDto } from '../interfaces/portfolio.interface';
import { GET_PORTFOLIO } from './get-portfolio.const';

@Injectable({
  providedIn: 'root',
})
export class PortfolioGqlService {
  private readonly apollo = inject(Apollo);

  get(address: string, chainId: string) {
    return this.apollo.query<{ portfolio: PortfolioDto }>({
      query: GET_PORTFOLIO,
      variables: {
        address,
        chainId,
      },
    }).pipe(
      filter(({ data }) => !!data?.portfolio),
      map(({ data }) => ({
        ...data?.portfolio,
        nativeBalance: {
          ...data?.portfolio?.nativeBalance,
          balanceInt: data?.portfolio?.nativeBalance?.balance.split('.')[0] ?? '0',
          decimalsInt: data?.portfolio?.nativeBalance?.balance.split('.')[1].slice(0, 6) ?? '',
          convertedUsd: formatCurrency(
            data?.portfolio?.nativeBalance?.usdValue ?? 0,
            'en-US',
            '$',
            'USD'
          ),
        }
      })),
    );
  }
}
