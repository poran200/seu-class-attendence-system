import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {LoaderService} from "./loader.service";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercptoreServiceService  implements HttpInterceptor{

  constructor(private authService: AuthService,public loader:LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url)
    this.loader.isLoading.next(true)
  // && req.url.indexOf('basicauth') === -1
    if (this.authService.isUserLoggedIn() ) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authService.username + ":" + this.authService.password)}`
        })
      });
      return next.handle(authReq).pipe(
        finalize(() => {
          this.loader.isLoading.next(false)
        })
      );
    } else {
      return next.handle(req).pipe(
        finalize(() => {
          this.loader.isLoading.next(false)
        })
      );
    }
  }
}
