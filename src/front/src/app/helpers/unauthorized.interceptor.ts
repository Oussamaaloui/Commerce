import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request)
    // .pipe(catchError((error: HttpErrorResponse) =>{
    //   if(error.status === 401){
    //     this.router.navigateByUrl('/logout');
    //     throw Error("Authentication required");
    //   }else{
    //     throw Error(error.error)
    //   }
    // })
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401 || request.url.indexOf('/login') > -1 ) {
         return;
        } 
        this.router.navigateByUrl('/logout');
      }
    }));
  }
}
