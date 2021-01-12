import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { Mensaje } from '../../interfaces/interfaces';

@Component({
  selector: 'app-listado-mensajes',
  templateUrl: './listado-mensajes.component.html',
  styleUrls: ['./listado-mensajes.component.css']
})
export class ListadoMensajesComponent implements OnInit {

  listaMensajes: Mensaje[];

  constructor(private mensajeService: MensajeService) { }

  ngOnInit(): void 
  {
    this.mensajeService.getListadoMensajes(0, 10).subscribe(res =>
      {
        this.listaMensajes = res;
      }
    );
  }

}
