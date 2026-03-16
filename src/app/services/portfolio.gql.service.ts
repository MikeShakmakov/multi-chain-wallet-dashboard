import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { filter, map } from 'rxjs';
import { PortfolioDto, PortfolioVm } from '../interfaces/portfolio.interface';
import { GET_PORTFOLIO } from './get-portfolio.const';
import { toDisplayBalance } from './portfolio.converter';

const hasPortfolio = (
  result: { data?: { portfolio?: PortfolioDto } },
): result is { data: { portfolio: PortfolioDto } } => !!result.data?.portfolio;

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
      filter(hasPortfolio),
      map(({ data }): PortfolioVm => ({
        ...data.portfolio,
        nativeBalance: toDisplayBalance(data.portfolio.nativeBalance),
        tokens: data.portfolio.tokens.map((token) => toDisplayBalance(token)),
      })),
    );
  }
}
