import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.urlServidor
  private http=inject(HttpClient)

    funListar2(){
    return this.http.get(`${this.baseUrl}/producto/back`)
  }
}
