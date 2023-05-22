import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      const reqWithToken = req.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      return next.handle(reqWithToken);
    } else {
      return next.handle(req);
    }
  }
}
