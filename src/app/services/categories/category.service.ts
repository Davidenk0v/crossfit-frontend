import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/Category';
import { Observable, catchError, throwError } from 'rxjs';
import { evironment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  errorMessage?:string;


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${evironment.urlApi}/categories/`)
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
