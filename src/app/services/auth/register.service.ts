import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../../interfaces/RegisterRequest';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  

  constructor(private http:HttpClient, private router:Router) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem('token')!= null);
    this.currentToken = new BehaviorSubject<string>(sessionStorage.getItem('token') ?? '');
   }

   register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(`${evironment.urlHost}auth/register`, credentials)
    .pipe(tap((response) => {
      console.log(response);
      sessionStorage.setItem("token", response.token);
      this.currentToken.next(response.token);
      this.currentUserLoginOn.next(true);
    }),
    map((response)=> response),
    catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 400){
      console.error(error.error);
      return throwError(()=> new Error("Ya existe un usuario con ese username o email"));
    }else {
      console.error(error.status, error.error);
    }
    return throwError(()=> new Error("Algo falló. Por favor intentelo de nuevo"));
  }

}
