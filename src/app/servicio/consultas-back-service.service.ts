import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/Usuario';
import { loginUser } from '../entidades/loginUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasBackServiceService {

  private APIURL: string = "http://localhost:3000";


  constructor(public http: HttpClient) { }


  public registrar(usuario:Usuario) {
    return this.http.post(this.APIURL + "/insertar", usuario);
  }

  public registrarMedic(usuario:Usuario) {
    return this.http.post(this.APIURL + "/insertarMedic", usuario);
  }
  public login(loginUsuario:loginUser):Observable<loginUser[]>{
    console.log(this.APIURL+"/loguear")
    return this.http.post<loginUser[]>(this.APIURL + "/loguear", loginUsuario);
    
  }

}
