import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/Usuario';
import { loginUser } from '../entidades/loginUser';

@Injectable({
  providedIn: 'root'
})
export class ConsultasBackServiceService {

  private APIURL: string = "https://leandro_alderete-clinica.mdbgo.io";


  constructor(public http: HttpClient) { }


  public registrar(usuario:Usuario) {
    return this.http.post(this.APIURL + "/insertar", usuario);
  }
  public login(loginUsuario:loginUser){
    return this.http.post(this.APIURL + "/loguear", loginUsuario);
    
  }

}
