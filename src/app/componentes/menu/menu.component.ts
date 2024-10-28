import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PrincipalComponent } from '../principal/principal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  public ret:boolean = false;
 
 public loginOk(): boolean {
    const accessToken = sessionStorage.getItem('USER_DATA');
    return !!accessToken;
  }
 
 public cerrarSesion(): void {
    sessionStorage.removeItem('USER_DATA');
    console.log("this : " + sessionStorage.getItem('USER_DATA'));
  }
 

}
