import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class peticionInterceptor implements HttpInterceptor{

  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL'+req.url)

    let peticion=req.clone({
      setHeaders:{
        'Accept':'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJwQGhtLmNvbSIsImlkIjoxLCJpYXQiOjE3MTc5NTQ2ODMsImV4cCI6MTcxNzk1ODI4M30.bsqYyHQKA-tBdqVF1SYNX8gC-Jcw6JvK_9D44Gw6kYk'
      }
    })
    return handler.handle(peticion).pipe(tap(()=>{},
  
    (error:any)=>{
      console.log("ERRORRRRRRR")
      if (error instanceof HttpErrorResponse){
        if(error.status!== 401){
          return
        }
        this.router.navigate(["auth/login"])
      }
    }
  ))
  }
}
 