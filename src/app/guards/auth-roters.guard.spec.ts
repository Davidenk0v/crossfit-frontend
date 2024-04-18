import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authRotersGuard } from './auth-roters.guard';

describe('authRotersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRotersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
