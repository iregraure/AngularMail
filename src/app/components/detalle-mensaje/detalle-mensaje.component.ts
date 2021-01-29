import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Mensaje } from '../../interfaces/interfaces';

@Component({
  selector: 'app-detalle-mensaje',
  templateUrl: './detalle-mensaje.component.html',
  styleUrls: ['./detalle-mensaje.component.css']
})
export class DetalleMensajeComponent implements OnInit {

  usuarioRemitente: Usuario;
  usuarioAutenticado: Usuario;

  constructor(@Inject(MAT_DIALOG_DATA) public mensaje: Mensaje,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<DetalleMensajeComponent>,
    private mensajeService: MensajeService,
    private comunicacionAlertas: ComunicacionDeAlertasService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario(this.mensaje.remitente.id, true).subscribe(usuario =>
      {
        this.usuarioRemitente = usuario;
      });
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>
      {
        this.usuarioAutenticado = usuario;
      });
    this.accionSobreMensaje(0);
  }

  volver()
  {
    this.dialogRef.close();
  }

  botonArchivarHabilitado()
  {
    return (!this.mensaje.archivado && !this.mensaje.spam && this.usuarioAutenticado != null && this.usuarioAutenticado.id != this.mensaje.remitente.id);
  }

  botonSpamHabilitado()
  {
    return (!this.mensaje.archivado && !this.mensaje.spam && this.usuarioAutenticado != null && this.usuarioAutenticado.id != this.mensaje.remitente.id);
  }

  botonEliminarHabilitado()
  {
    return (this.mensaje.fechaEliminacion == null && this.usuarioAutenticado != null && this.usuarioAutenticado.id != this.mensaje.remitente.id);
  }

  botonMoverRecibidosHabilitado()
  {
    return (this.mensaje.archivado || this.mensaje.spam);
  }

  accionSobreMensaje(tipoAccion: number)
  {
    this.mensajeService.accionSobreMensajes([this.mensaje.id], tipoAccion).subscribe(resul =>
      {
        if(resul['result'] == 'fail')
        {
          if(tipoAccion != 0)
          {
            this.comunicacionAlertas.mostrarSnackBar("Error al realizar la operación. Inténtelo de nuevo más tarde");
          }
        }
        else
        {
          if(tipoAccion != 0)
          {
            this.volver();
          }
        }
      });
  }

}
