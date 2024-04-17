import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { evironment } from '../../environment/environment';
import { Workout } from '../interfaces/Workout';

@Injectable({
  providedIn: 'root'
})
export class EntrenosService {

  constructor(private http: HttpClient) { }

  errorMessage?:string;

  getAllWorkout(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${evironment.urlApi}/workouts/`)
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

}
