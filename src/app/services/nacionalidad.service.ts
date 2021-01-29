import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nacionalidad } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadService {

  constructor(private http: HttpClient) { }

  getListadoNacionalidades(): Observable<Nacionalidad[]>
  {
    return this.http.get<Nacionalidad[]>('/nacionalidad/all');
  }
}
