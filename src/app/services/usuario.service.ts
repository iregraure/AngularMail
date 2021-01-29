import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt, Usuario } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario;
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();

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

  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario>
  {
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen).pipe(
      tap(usu => 
        {
          if ((this.usuarioAutenticado == null && usu != null) || (this.usuarioAutenticado != null && usu == null) || 
              (this.usuarioAutenticado != null && usu == null && this.usuarioAutenticado.id != usu.id))
              {
                this.emitirNuevoCambioEnUsuarioAutenticado();
                this.usuarioAutenticado = usu;
              }
        })
    )
  }

  emitirNuevoCambioEnUsuarioAutenticado()
  {
    this.getUsuarioAutenticado(true).subscribe(usuAutenticado => 
      {
        this.cambiosEnUsuarioAutenticado.emit(usuAutenticado);
      });
  }

  ratificaPasswordUsuarioAutenticado(pass: String): Observable<object>
  {
    var dto = 
    {
      'password': pass
    }
    return this.http.post<object>('/usuario/ratificaPassword', dto);
  }

  cambiaPassordUsuarioAutenticado(pass: String): Observable<object>
  {
    var dto = 
    {
      'password': pass
    }
    return this.http.post<object>('/usuario/modificaPassword', dto);
  }

  actualizaDatosUsuario(usuario: Usuario)
  {
    return this.http.post<String>('/usuario/update', usuario).pipe(tap(resul =>
      {
        this.emitirNuevoCambioEnUsuarioAutenticado();
      }));
  }

  getUsuario(id: number, incluirImagen: boolean = false): Observable<Usuario>
  {
    let url = `/usuario/get?id=${id}&imagen=${incluirImagen}`;
    return this.http.get<Usuario>(url);
  }

filterUserByNameOrEmail(filtro: string): Observable<Usuario[]>
{
  return this.http.get<Usuario[]>(`/usuario/filterByNombreOrEmail?filtro=${filtro}`).pipe(
    tap(resul => console.log(resul))
  );
}

}
