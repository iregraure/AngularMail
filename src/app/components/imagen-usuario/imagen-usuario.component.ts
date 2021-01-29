import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-imagen-usuario',
  templateUrl: './imagen-usuario.component.html',
  styleUrls: ['./imagen-usuario.component.css']
})
export class ImagenUsuarioComponent {

  @Input('usuario') usuario: Usuario;
  @Input('height') height: number;
  @Input('width') width: number;

  constructor(){}

}
