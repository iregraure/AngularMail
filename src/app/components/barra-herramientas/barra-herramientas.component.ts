import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AutenticadorJwtService } from 'src/app/services/autenticador-jwt.service';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from '../../services/usuario.service';
import { DialogTypes } from '../dialogo-general/dialog-data-type';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.css']
})
export class BarraHerramientasComponent implements OnInit{

  usuarioAutenticado: Usuario; 

  constructor(private comunicacionAlertasService: ComunicacionDeAlertasService, private autenticacionJwt: AutenticadorJwtService,
              private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit()
  {
    this.usuarioService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuario =>
      {
        this.usuarioAutenticado = nuevoUsuario;
      })
  }

  navegarHaciaPrincipal()
  {
    this.router.navigate(['/listadoMensajes']);
  }

  confirmacionAbandonarSesion()
  {
    this.comunicacionAlertasService.dialogoConfirmacion('¿Seguro que quieres cerrar la sesión?').subscribe(opcion => 
      {
        if(opcion == DialogTypes.ACEPTAR)
        {
          this.autenticacionJwt.eliminaJWT();
          this.router.navigate(['/login']);
        }
      })
  }

  navegarHaciaDatosPersonales()
  {
    this.router.navigate(['/datosUsuario']);
  }

  navegarHaciaCambiaPassword()
  {
    this.router.navigate(['/cambioPassword']);
  }

}
