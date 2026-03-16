import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppFormService } from './services/app-form.service';
import { ChainsEntityService } from './services/chains.entity.service';
import { PortfolioEntityService } from './services/portfolio.entity.service';
import { TransactionsEntityService } from './services/transactions.entity.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [AppFormService, ChainsEntityService, PortfolioEntityService, TransactionsEntityService],
})
export class App {
  private readonly appFormService = inject(AppFormService);
  private readonly chainsEntityService = inject(ChainsEntityService);
  private readonly portfolioEntityService = inject(PortfolioEntityService);
  private readonly transactionsEntityService = inject(TransactionsEntityService);

  protected readonly form = this.appFormService.form;
  protected readonly chains = this.chainsEntityService.chains;
  protected readonly portfolio = this.portfolioEntityService.portfolio;
  protected readonly portfolioError = this.portfolioEntityService.error;
  protected readonly portfolioLoading = this.portfolioEntityService.loading;
  protected readonly transactions = this.transactionsEntityService.transactions;
  protected readonly transactionsError = this.transactionsEntityService.error;
  protected readonly transactionsLoading = this.transactionsEntityService.loading;
  protected readonly balanceColumns = ['symbol', 'balance', 'usdBalance'];
  protected readonly transactionColumns = ['hash', 'participants', 'sum', 'date'];

  getBalance(): void {
    if (this.form.valid) {
      const { chain, address } = this.form.value;
      this.portfolioEntityService.getBalanceAction.next({ chain: chain!.id, address: address! });
      this.transactionsEntityService.getTransactionsAction.next({
        chain: chain!.id,
        address: address!,
      });
    }
  }
}
