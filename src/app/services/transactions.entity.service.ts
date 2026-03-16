import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, Subject, switchMap, tap } from 'rxjs';
import { TransactionsGqlService } from './transactions.gql.service';

@Injectable()
export class TransactionsEntityService {
  readonly getTransactionsAction = new Subject<{ address: string; chain: string }>();
  readonly loading = signal(false);

  private readonly gql = inject(TransactionsGqlService);
  private readonly transactions$ = this.getTransactionsAction.pipe(
    tap(() => this.loading.set(true)),
    switchMap(({ address, chain }) =>
      this.gql.get(address, chain, 10).pipe(finalize(() => this.loading.set(false))),
    ),
  );

  readonly error = this.gql.errors;
  readonly transactions = toSignal(this.transactions$);
}
