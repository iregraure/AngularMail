import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Nacionalidad, TipoSexo, Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { NacionalidadService } from 'src/app/services/nacionalidad.service';
import { TipoSexoService } from 'src/app/services/tipo-sexo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario = null;
  nacionalidades: Nacionalidad[];
  tiposSexo: TipoSexo[];
  
  constructor(private router: Router, 
    private usuarioService: UsuarioService, 
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private nacionalidadService: NacionalidadService, 
    private tipoSexoService: TipoSexoService) { }

  ngOnInit(): void 
  {
    this.cargarNacionalidades();
    this.cargarTipoSexo();
    this.cargarDatosUsuarioAutenticado();

    this.form = new FormGroup(
      {
        usuario: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        fechaNacimiento: new FormControl('', [Validators.required]),
        nacionalidad: new FormControl('', []),
        sexo: new FormControl('', [])
      }
    )

  }

  cargarNacionalidades()
  {
    this.nacionalidades = [];
    this.nacionalidadService.getListadoNacionalidades().subscribe(nacionalidades =>
      {
        nacionalidades.forEach(nacionalidad => 
          {
            this.nacionalidades.push(nacionalidad)
          })
      });
  }

  cargarTipoSexo()
  {
    this.tiposSexo = [];
    this.tipoSexoService.getListadoTipoSexo().subscribe(tiposSexo =>
      {
        tiposSexo.forEach(tipoSexo =>
          {
            this.tiposSexo.push(tipoSexo)
          })
      });
  }

  cargarDatosUsuarioAutenticado()
  {
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usu =>
      {
        this.usuario = usu;
        this.form.controls.usuario.setValue(this.usuario.usuario);
        this.form.controls.email.setValue(this.usuario.email);
        this.form.controls.nombre.setValue(this.usuario.nombre);
        this.form.controls.fechaNacimiento.setValue(new Date(this.usuario.fechaNacimiento));
        this.form.controls.nacionalidad.setValue(this.usuario.nacionalidad);
        this.form.controls.sexo.setValue(this.usuario.sexo);
      })
  }

  cancelar()
  {
    this.router.navigate(['/listadoMensajes']);
  }

  usuarioSelecionaFicheroImagen()
  {
    const inputNode: any = document.querySelector('#file');
    if(typeof (FileReader) !== 'undefined')
    {
      const reader = new FileReader();
      reader.readAsArrayBuffer(inputNode.files[0]);
      reader.onload = (e: any) => 
      {
        this.usuario.imagen = btoa(new Uint8Array(e.target.result)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

  actualizarDatos()
  {
    this.comunicacionAlertas.dialogCargando();

    this.usuario.usuario = this.form.controls.usuario.value;
    this.usuario.email = this.form.controls.email.value;
    this.usuario.nombre = this.form.controls.nombre.value;
    this.usuario.fechaNacimiento = this.form.controls.fechaNacimiento.value.getTime();
    this.usuario.nacionalidad = this.form.controls.nacionalidad.value;
    this.usuario.sexo = this.form.controls.sexo.value;

    this.usuarioService.actualizaDatosUsuario(this.usuario).subscribe(resul =>
      {
        if(resul["result"] == 'fail')
        {
          this.comunicacionAlertas.dialogError("Error al actuallizar los datos del usuario. Inténtelo de nuevo más tarde");
        }
        else
        {
          this.comunicacionAlertas.dialogInfo('Usuario actualizado').subscribe(resul =>
            {
              this.router.navigate(['/listadoMensajes']);
            });
        }
      })
  }

}
