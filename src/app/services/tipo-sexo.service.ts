import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoSexo } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TipoSexoService {

  constructor(private http: HttpClient) { }

  getListadoTipoSexo(): Observable<TipoSexo[]>
  {
    return this.http.get<TipoSexo[]>('/tiposexo/all');
  }
}
