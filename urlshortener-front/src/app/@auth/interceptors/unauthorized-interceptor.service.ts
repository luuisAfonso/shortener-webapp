import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NbAuthService} from '@nebular/auth';


@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptorService {

  constructor(private as: NbAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.as.logout('email').subscribe();
        }

        return throwError(error);
      }),
    );
  }
}
