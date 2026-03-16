import { TestBed } from '@angular/core/testing';

import { ChainsGQL } from './chains.gql';

describe('ChainsHttp', () => {
  let service: ChainsGQL;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainsGQL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
