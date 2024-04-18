import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const authRotersGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if(!loginService.currentUserLoginOn.value) {
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
