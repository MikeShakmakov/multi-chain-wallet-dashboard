import { TestBed } from '@angular/core/testing';
import { of, EMPTY } from 'rxjs';
import { signal } from '@angular/core';
import { App } from './app';
import { ChainsGQL } from './services/chains.gql.setvice';
import { PortfolioGqlService } from './services/portfolio.gql.service';
import { TransactionsGqlService } from './services/transactions.gql.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: ChainsGQL,
          useValue: {
            get: () =>
              of([{ id: 'ethereum', name: 'Ethereum', nativeCurrency: { symbol: 'ETH' } }]),
          },
        },
        {
          provide: PortfolioGqlService,
          useValue: {
            errors: signal<string | null>(null),
            get: () => EMPTY,
          },
        },
        {
          provide: TransactionsGqlService,
          useValue: {
            errors: signal<string | null>(null),
            get: () => EMPTY,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Multi-Chain Wallet Dashboard');
  });
});
