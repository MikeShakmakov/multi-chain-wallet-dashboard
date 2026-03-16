import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppFormService } from './services/app-form.service';
import { ChainsEntityService } from './services/chains.entity.service';
import { PortfolioEntityService } from './services/portfolio.entity.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CurrencyPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [AppFormService, ChainsEntityService, PortfolioEntityService],
})
export class App {
  private readonly appFormService = inject(AppFormService);
  private readonly chainsEntityService = inject(ChainsEntityService);
  private readonly portfolioEntityService = inject(PortfolioEntityService);

  protected readonly form = this.appFormService.form;
  protected readonly chains = this.chainsEntityService.chains;
  protected readonly portfolio = this.portfolioEntityService.portfolio;
  protected readonly portfolioError = this.portfolioEntityService.error;
  protected readonly portfolioLoading = this.portfolioEntityService.loading;
  protected readonly columns = ['symbol', 'balance', 'usdBalance'];

  getBalance(): void {
    if (this.form.valid) {
      const { chain, address } = this.form.value;
      this.portfolioEntityService.getBalanceAction.next({ chain: chain!.id, address: address! });
    }
  }

}
