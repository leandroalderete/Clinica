import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { loginUser } from '../../entidades/loginUser';
import { ConsultasBackServiceService } from '../../servicio/consultas-back-service.service';
import { error } from 'console';
import { dataToken } from '../../entidades/loginResponse';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginUsuario: loginUser = {
    dni: '',
    contra: '',
    tipoUsuario:'',

  }
  //public usuarioEjemplo: loginUser[] = [     {        dni: '',         contra: "" } ];
  constructor(private consultaBackApi: ConsultasBackServiceService ,private root:Router) {  // INSTANCIO MI CLASE DE BACK PARA TODOS LOS OOPERADORES

  }

  login(){
    this.consultaBackApi.login(this.loginUsuario).subscribe(
      (consultausuario :loginUser[]) =>{
        if(consultausuario[0].dni == null ) {
          console.error ("Usuario inexistente");

        }else { 
          switch(this.loginUsuario.tipoUsuario){
            case "Afiliado":
              this.root.navigateByUrl("/afiliado");
              break;
            case "medico":
              this.root.navigateByUrl("/medico");
              break;
            case "admin":
              this.root.navigateByUrl("/admin");
              break;
          }
          
        } // casteo la consultausuario al objeto logiUser 
        

      }
    )

  }

}
