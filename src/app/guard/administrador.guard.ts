import { CanActivateFn } from '@angular/router';
import { loginUser } from '../entidades/loginUser';

export const administradorGuard: CanActivateFn = (route, state) => {

  var accessUser: any = sessionStorage.getItem('USER_DATA'); //lleno con datos uqe obtnego con sesion storage
  if (accessUser != null) {
    accessUser = JSON.parse(accessUser) as loginUser; // lo paso como objeto 
    if (accessUser.tipoUsuario == 'admin') {   // accedo al tipo usuario como admin
      return true;
    }
  }
  return false;
};

export const afliadoGuard: CanActivateFn = (route, state) => {

  var accessUser: any = sessionStorage.getItem('USER_DATA'); //lleno con datos que obtengo con sesion storage
  if (accessUser != null) {
    accessUser = JSON.parse(accessUser) as loginUser; // lo paso como objeto 
    if (accessUser.tipoUsuario == 'Afiliado') {   // accedo al tipo usuario como admin
      return true;
    }
  }
  return false;
};


export const medicoGuard: CanActivateFn = (route, state) => {

  var accessUser: any = sessionStorage.getItem('USER_DATA'); //lleno con datos uqe obtnego con sesion storage
  if (accessUser != null) {
    accessUser = JSON.parse(accessUser) as loginUser; // lo paso como objeto 
    if (accessUser.tipoUsuario == 'medico') {   // accedo al tipo usuario como admin
      return true;
    }
  }
  return false;
};

