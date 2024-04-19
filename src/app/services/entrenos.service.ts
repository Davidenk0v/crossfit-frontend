import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { evironment } from '../../environment/environment';
import { Workout } from '../interfaces/Workout';
import { WorkoutRequest } from '../interfaces/WorkoutRequest';

@Injectable({
  providedIn: 'root'
})
export class EntrenosService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;

  getAllWorkout(id:number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${evironment.urlApi}/workouts/user/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          this.errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }

        return throwError(() => this.errorMessage);
      })
    );
  }

  addWorkout(credentials:WorkoutRequest): Observable<any> {
    return this.http.post<any>(`${evironment.urlApi}/workouts/`, credentials).pipe(
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

  deleteWorkout(id: number): Observable<any> {
    return this.http.delete<any>(`${evironment.urlApi}/workouts/${id}`).pipe(
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
