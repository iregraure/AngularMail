import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosConJwt } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  autenticaUsuario(usuario: string, pass: string): Observable<DatosConJwt>
  {
    const md5 = new Md5();
    var jsonObject = 
    {
      usuario: usuario,
      password: md5.appendStr(pass).end().toString()
    };

    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject).pipe(
      // tap(res => 
      //   {
      //     console.log(`Desde tap miro los datos recibidos ${res["jwt"]}`);
      //   })
    );
  }
}
