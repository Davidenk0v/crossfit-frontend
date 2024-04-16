import { TestBed } from '@angular/core/testing';

import { EntrenosService } from './entrenos.service';

describe('EntrenosService', () => {
  let service: EntrenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
