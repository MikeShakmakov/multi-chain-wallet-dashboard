import { TestBed } from '@angular/core/testing';

import { PortfolioEntityService } from './portfolio.entity.service';

describe('PortfolioEntityService', () => {
  let service: PortfolioEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
