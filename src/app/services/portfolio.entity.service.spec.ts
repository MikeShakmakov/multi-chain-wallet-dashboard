import { TestBed } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { signal } from '@angular/core';

import { PortfolioEntityService } from './portfolio.entity.service';
import { PortfolioGqlService } from './portfolio.gql.service';

describe('PortfolioEntityService', () => {
  let service: PortfolioEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioEntityService,
        {
          provide: PortfolioGqlService,
          useValue: {
            errors: signal<string | null>(null),
            get: () => EMPTY,
          },
        },
      ],
    });
    service = TestBed.inject(PortfolioEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
