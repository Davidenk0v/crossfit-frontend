import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { evironment } from '../../../environment/environment';
import { Movement } from '../../interfaces/Movement';
import { NewMovementRequest } from '../../interfaces/NewMovementRequest';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private dataSubject = new BehaviorSubject<string>('');
  sharedData = this.dataSubject.asObservable();

  constructor(private http:HttpClient) { }

  getAllMovements(): Observable<Movement[]> {
    return this.http.get<Movement[]>(`${evironment.urlApi}/movements/`).pipe(
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

  deleteMovement(id: number): Observable<any> {
    return this.http.delete<any>(`${evironment.urlApi}/movements/${id}`).pipe(
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

  addMovement(credentials:NewMovementRequest): Observable<any> {
    return this.http.post<any>(`${evironment.urlApi}/movements/`, credentials).pipe(
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

  updateData(value: string) {
    this.dataSubject.next(value);
  }

  
}
