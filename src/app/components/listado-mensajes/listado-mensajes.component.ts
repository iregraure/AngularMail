import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { Mensaje, Usuario, ListadoMensajes } from '../../interfaces/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetalleMensajeComponent } from '../detalle-mensaje/detalle-mensaje.component';
import { NuevoMensajeComponent } from '../nuevo-mensaje/nuevo-mensaje.component';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.css']
})
export class ListadoMensajesComponent implements OnInit, AfterViewInit {

  usuarioAutenticado: Usuario;
  nombreDeColumnas: string[] = ['Select', 'De', 'Asunto', 'Fecha'];
  listaMensajes: ListadoMensajes =
  {
    mensajes: [],
    totalMensajes: 0
  };
  tipoListadoMensajes: number = 0; 
    // 0 - Recibidos   1 - Enviados    2 - SPAM    3 - Archivados
  dataSource = new MatTableDataSource<Mensaje>(this.listaMensajes.mensajes);
  selection = new SelectionModel<Mensaje>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mensajeService: MensajeService,
    private comunicacionAlertas: ComunicacionDeAlertasService,
    private usuarioService: UsuarioService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void 
  {
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>
      {
        if(usuario == null)
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.usuarioAutenticado = usuario;
        }
      })
  }

  ngAfterViewInit()
  {
    this.configuraEtiquetasPaginador();
    this.actualizaListadoMensajes();
  }

  private configuraEtiquetasPaginador()
  {
    this.paginator._intl.itemsPerPageLabel = "Mensajes por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primera";
    this.paginator._intl.lastPageLabel = "Última";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) =>
      {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} de ${length}`
      }
  }

  actualizaListadoMensajes()
  {
    this.comunicacionAlertas.dialogCargando();
    this.mensajeService.getListadoMensajes(this.tipoListadoMensajes, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data =>
      {
        if(data["result"] == "fail")
        {
          this.comunicacionAlertas.dialogError("Imposible obtener los mensajes desde el servidor");
        }
        else
        {
          this.listaMensajes = data;
          this.dataSource = new MatTableDataSource<Mensaje>(this.listaMensajes.mensajes);
          this.comunicacionAlertas.cerrarDialogo();
        }
      })
  }

  seleccionarMensaje(mensaje: Mensaje)
  {
    const dialogoRef = this.dialog.open(DetalleMensajeComponent,
      {
        width: '100%',
        height: '90%',
        data: mensaje
      });
      dialogoRef.afterClosed().subscribe(resul =>
        {
          this.actualizaListadoMensajes();
        });
  }

  verMensajesSeleccionados()
  {
    console.log(this.selection);
  }

  isAllSelected()
  {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToogle()
  {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Mensaje): string
  {
    if (!row)
    {
      return `${this.isAllSelected() ? 'select' : 'deselect'}`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  cambioTipoMensajeVisualizado(indiceTipoMensaje)
  {
    this.paginator.firstPage();
    this.tipoListadoMensajes = indiceTipoMensaje;
    this.actualizaListadoMensajes();
  }

  getIdsMensajesSeleccionados(): number[]
  {
    let idsMensajes: number[];
    this.selection.selected.forEach((item, index) =>
    {
      idsMensajes.push(item.id);
    });
    return idsMensajes;
  }

  accionSobreMensajes(tipoAccion: number)
  {
    this.mensajeService.accionSobreMensajes(this.getIdsMensajesSeleccionados(), tipoAccion).subscribe(resul =>
      {
        if(resul["result"] == 'fail')
        {
          this.comunicacionAlertas.dialogError("Error al realizar la operación. Inténtelo más tarde");
        }
        else
        {
          this.actualizaListadoMensajes();
        }
      });
  }

  hayElementosSeleccionadosTabla(): boolean
  {
    return this.selection.selected.length > 0;
  }

  botonArchivarHabilitado(): boolean
  {
    return this.tipoListadoMensajes == MensajeService.RECIBIDOS && this.hayElementosSeleccionadosTabla();
  }

  botonSpamHabilitado(): boolean
  {
    return this.tipoListadoMensajes == MensajeService.RECIBIDOS && this.hayElementosSeleccionadosTabla();
  }

  botonEliminarHabilitado(): boolean
  {
    return this.tipoListadoMensajes != MensajeService.ENVIADOS && this.hayElementosSeleccionadosTabla();
  }

  botonMoverRecibidoHabilitado(): boolean
  {
    return (this.tipoListadoMensajes == MensajeService.SPAM || this.tipoListadoMensajes == MensajeService.ARCHIVADOS) && this.hayElementosSeleccionadosTabla();
  }

  getTextoColumnaRemitente(mensaje: Mensaje)
  {
    let remitente: string;
    if(this.usuarioAutenticado.id != mensaje.remitente.id)
    {
      remitente = `De ${mensaje.remitente.nombre}`;
    }
    else
    {
      remitente = 'Para: ';
      mensaje.destinatarios.forEach((destinatario, i, destinatarios) => 
      {
        remitente += destinatario.nombre;
        if(i < (destinatarios.length-1))
        {
          remitente += ',';
        }
      })
      return remitente;
    }
  }

  nuevoMensaje()
  {
    const dialogoRef = this.dialog.open(NuevoMensajeComponent,
      {
        width: '100%',
        height: '90%'
      });
      dialogoRef.afterClosed().subscribe(resul =>
        {
          this.actualizaListadoMensajes();
        });
  }
  
}
