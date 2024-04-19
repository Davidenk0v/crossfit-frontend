import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { evironment } from '../../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../interfaces/JwtPayload';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http:HttpClient, private router:Router) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem('token') != null);
    this.currentToken = new BehaviorSubject<string>(sessionStorage.getItem('token') ?? '');
    this.currentUserAdmin = new BehaviorSubject<boolean>(false);
   }

   login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>(`${evironment.urlHost}auth/login`,credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentToken.next(userData.body);
        this.currentUserLoginOn.next(true);
          const {authorities} = jwtDecode(userData.token) as JwtPayload;
          if(authorities == 'ROLE_ADMIN'){
            this.currentUserAdmin.next(true);
          }
      }),
      map((userData)=> userData),
      catchError(this.handleError)
    );
  }

  logout(){
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.currentUserAdmin.next(false);
    this.router.navigateByUrl('/login')
  }


  private handleError(error:HttpErrorResponse){
    if(error.status === 401){
      console.error(error.error);
      return throwError(()=> new Error("Contraseña o email incorrecto"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }
}
