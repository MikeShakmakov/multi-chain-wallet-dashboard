import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EMPTY, catchError, map, tap } from 'rxjs';
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

  // TODO can be mapped to control error
  errors: WritableSignal<string | null> = signal(null);

  get(address: string, chainId: string) {
    return this.apollo.query<{ portfolio: PortfolioDto }>({
      query: GET_PORTFOLIO,
      variables: {
        address,
        chainId,
      },
    }).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        if (!hasPortfolio(response)) {
          throw new Error('Portfolio response does not contain portfolio data');
        }

        return response.data.portfolio;
      }),
      tap(() => this.errors.set(null)),
      map((portfolio): PortfolioVm => ({
        ...portfolio,
        nativeBalance: toDisplayBalance(portfolio.nativeBalance),
        tokens: portfolio.tokens.map((token) => toDisplayBalance(token)),
      })),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Failed to fetch portfolio';
        this.errors.set(message);
        return EMPTY;
      }),
    );
  }
}
