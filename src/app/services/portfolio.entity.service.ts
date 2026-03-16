import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { PortfolioGqlService } from './portfolio.gql.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, merge, shareReplay, Subject, switchMap, tap, finalize } from 'rxjs';

@Injectable()
export class PortfolioEntityService {
  getBalanceAction = new Subject<{address: string, chain: string}>();
  loading = signal(false);

  private readonly gql = inject(PortfolioGqlService);
  private portfolio$ = this.getBalanceAction.pipe(
    tap(() => this.loading.set(true)),
    switchMap(({address, chain}) => this.gql.get(address, chain).pipe(
      finalize(() => this.loading.set(false))
    )),
    // shareReplay({ bufferSize: 1, refCount: true }),
  );

  portfolio = toSignal(this.portfolio$);
}
