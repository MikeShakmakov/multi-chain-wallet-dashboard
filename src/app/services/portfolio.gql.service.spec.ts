import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { PortfolioGqlService } from './portfolio.gql.service';

describe('PortfolioGqlService', () => {
  let service: PortfolioGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PortfolioGqlService,
        {
          provide: Apollo,
          useValue: {
            query: () => undefined,
          },
        },
      ],
    });
    service = TestBed.inject(PortfolioGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
