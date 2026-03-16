import { TestBed } from '@angular/core/testing';

import { ChainsHttp } from './chains.http';

describe('ChainsHttp', () => {
  let service: ChainsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChainsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
