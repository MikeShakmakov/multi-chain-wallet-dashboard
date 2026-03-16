import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, Subject, switchMap, tap } from 'rxjs';
import { PortfolioGqlService } from './portfolio.gql.service';

@Injectable()
export class PortfolioEntityService {
  getBalanceAction = new Subject<{address: string, chain: string}>();
  loading = signal(false);
  private readonly gql = inject(PortfolioGqlService);

  error = this.gql.errors;
  private portfolio$ = this.getBalanceAction.pipe(
    tap(() => this.loading.set(true)),
    switchMap(({address, chain}) => this.gql.get(address, chain).pipe(
      finalize(() => this.loading.set(false))
    )),
  );

  portfolio = toSignal(this.portfolio$);
}
