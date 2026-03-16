import { TestBed } from '@angular/core/testing';

import { PortfolioGqlService } from './portfolio.gql.service';

describe('PortfolioGqlService', () => {
  let service: PortfolioGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
