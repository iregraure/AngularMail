import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  form: FormGroup;
  hideActual = true;
  hideNueva = true;

  constructor(private router: Router, private usuarioService: UsuarioService,
    private comunicacionAlertas: ComunicacionDeAlertasService) { }

  ngOnInit(): void 
  {
    this.form = new FormGroup(
      {
        actual: new FormControl('', [Validators.required]),
        nueva: new FormControl('', [Validators.required])
      }
    );
  }

  actualizarPassword()
  {
    this.comunicacionAlertas.dialogCargando();
    let actualEnciptado = this.encriptaMD5(this.form.controls.actual.value);
    this.usuarioService.ratificaPasswordUsuarioAutenticado(actualEnciptado).subscribe(resul => 
      {
        if(resul["result"] == 'fail')
        {
          this.comunicacionAlertas.dialogError('La contraseña actual introducida no es válida o no se puede comprobar');
        }
        else
        {
          let nuevaEncriptada = this.encriptaMD5(this.form.controls.nueva.value);
          this.usuarioService.cambiaPassordUsuarioAutenticado(nuevaEncriptada).subscribe(resul =>
            {
              if(resul["result"] == 'fail')
              {
                this.comunicacionAlertas.dialogError("Error al actualizar la contraseña. Intentelo más tarde");
              }
              else
              {
                this.comunicacionAlertas.dialogInfo('Contraseña actualizada').subscribe(resul =>
                  {
                    this.router.navigate(['/listadoMensajes']);
                  });
              }
            })
        }
      });
  }

  encriptaMD5 (texto: string): string
  {
    const md5 = new Md5();
    return md5.appendStr(texto).end().toString();
  }

  cancelar()
  {
    this.router.navigate(['/listadoMensajes']);
  }

}
