import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  
  const authToken = sessionStorage.getItem('token');


  // Clone the request and add the authorization header
  if(authToken != '' && authToken != null){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 400) {
          // Specific handling for unauthorized errors         
          console.error('Bad Request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else if(err.status == 200){
          // Handle other HTTP error codes
          console.log('OK', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err); 
    })
  );

};
