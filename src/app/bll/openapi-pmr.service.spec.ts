import { TestBed } from '@angular/core/testing';

import { OpenapiPmrService } from './openapi-pmr.service';

describe('OpenapiPmrService', () => {
  let service: OpenapiPmrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenapiPmrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
