import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../interfaces/User';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${evironment.urlApi}/users/`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => errorMessage);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${evironment.urlApi}/users/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => errorMessage);
      })
    );
  }
}
