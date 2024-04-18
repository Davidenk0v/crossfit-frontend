import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../interfaces/JwtPayload';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = sessionStorage.getItem('token') ?? '';

  const {authorities} = jwtDecode(token) as JwtPayload;
  if(authorities != "ROLE_ADMIN"){
    router.navigateByUrl('/mis-entrenos');
    return false;
  }
  
  return true;
};
