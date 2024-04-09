import { TestBed } from '@angular/core/testing';

import { GaresService } from './gares.service';

describe('GaresService', () => {
  let service: GaresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
