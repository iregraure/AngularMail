import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private usuario: UsuarioService, private router: Router, private autenticadorJwt: AutenticadorJwtService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        usuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
        pass: new FormControl('', [Validators.required])
      }
    );
  }

  autenticaUsuario()
  {
    this.usuario.autenticaUsuario(this.loginForm.controls.usuario.value, this.loginForm.controls.pass.value).subscribe(res =>
      {
        if(res.jwt != undefined)
        {
          this.autenticadorJwt.almacenaJWT(res.jwt);
          this.router.navigate(['/listadoMensajes']);
        }
        else{
          console.log("Datos incorrectos");
        }
      });
  }

}
