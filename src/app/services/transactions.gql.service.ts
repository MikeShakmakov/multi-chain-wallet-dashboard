import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { EMPTY, catchError, map, tap } from 'rxjs';
import { TransactionDataDto, TransactionDataVm } from '../interfaces/transaction.interface';
import { GET_TRANSACTIONS } from './get-transactions.const';
import { toDisplayTransaction } from './transactions.converter';

const hasTransactions = (
  result: { data?: { transactions?: TransactionDataDto[] } },
): result is { data: { transactions: TransactionDataDto[] } } => Array.isArray(result.data?.transactions);

@Injectable({
  providedIn: 'root',
})
export class TransactionsGqlService {
  private readonly apollo = inject(Apollo);

  readonly errors: WritableSignal<string | null> = signal(null);

  get(address: string, chainId: string, limit: number) {
    return this.apollo.query<{ transactions: TransactionDataDto[] }>({
      query: GET_TRANSACTIONS,
      variables: {
        address,
        chainId,
        limit,
      },
    }).pipe(
      map((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }

        if (!hasTransactions(response)) {
          throw new Error('Transactions response does not contain transactions data');
        }

        return response.data.transactions;
      }),
      tap(() => this.errors.set(null)),
      map((transactions): TransactionDataVm[] =>
        transactions.map((transaction) => toDisplayTransaction(transaction)),
      ),
      catchError((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Failed to fetch transactions';
        this.errors.set(message);
        return EMPTY;
      }),
    );
  }
}
