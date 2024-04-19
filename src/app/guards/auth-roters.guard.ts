import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { UsersService } from '../services/user/users.service';

export const authRotersGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const userService = inject(UsersService);
  const router = inject(Router);

  if(!loginService.currentUserLoginOn.value) {
    router.navigateByUrl("/login");
    return false;
  }



  return true;
};
