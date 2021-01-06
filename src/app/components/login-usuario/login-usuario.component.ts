import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        usuario: new FormControl('rafa', [Validators.required, Validators.minLength(4)]),
        pass: new FormControl('81dc9bdb52d04dc20036dbd8313ed055', [Validators.required])
      }
    );
  }

  autenticaUsuario()
  {
    console.log(`Usuario válido? ${this.loginForm.controls.usuario.valid}`);
    // var jsonObject = 
    // {
    //   usuario: this.loginForm.controls.usuario.value,
    //   password: this.loginForm.controls.pass.value
    // };

    // console.log(`u: ${jsonObject.usuario} - p: ${jsonObject.password}`);

    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function ()
    // {
    //   if(this.readyState == 4 && this.status == 200)
    //   {
    //     document.getElementById("respuestaDelServidor").innerHTML = this.response;
    //   }
    // };
    // xhttp.open("POST", "http://localhost:8080/usuario/autentica");
    // xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhttp.send(JSON.stringify(jsonObject));
  }

}
