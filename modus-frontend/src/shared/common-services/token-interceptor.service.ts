import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
// import { Cache } from './cache.service';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  // write encryption and decryption logic here
  count: any;
  constructor(
    private custAlert: AlertService,
    // private cache: Cache,
    private router: Router
  ) {}

  // Adding headers

  addAuthHeader(request: any) {
    // if (this.cache?.user?.authorizationToken) {
    //   return request.clone({
    //     setHeaders: {
    //       Authorization: request.headers.has('authorization')
    //         ? request.headers.get('authorization')
    //         : `Bearer ${this.cache.user.authorizationToken}`,
    //     },
    //   });
    // }
    return request;
  }

  getParams(url: any) {
    let paramsJSON;
    if (url.indexOf('?') !== -1) {
      let URLparamsString = url.substring(url.indexOf('?') + 1);
      paramsJSON = JSON.parse(
        '{"' +
          decodeURI(URLparamsString)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
    } else {
      paramsJSON = {};
    }
    return paramsJSON;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      tap({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              this.custAlert.error('Token Expired, Kindly login again!');
              this.router.navigate(['./login']);
            }
          }
          return event;
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.custAlert.error('Unauthorized access!');
            this.router.navigate(['./login']);
          } else if (error.status === 404) {
            this.custAlert.error('Invalid Request: Page Not Found');
          }
        },
      })
    );
  }
}
