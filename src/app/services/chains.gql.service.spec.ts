import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { ChainsGQL } from './chains.gql.setvice';

describe('ChainsHttp', () => {
  let service: ChainsGQL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChainsGQL,
        {
          provide: Apollo,
          useValue: {
            watchQuery: () => ({
              valueChanges: of({ data: { chains: [] } }),
            }),
          },
        },
      ],
    });
    service = TestBed.inject(ChainsGQL);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
