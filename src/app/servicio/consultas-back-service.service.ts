import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/Usuario';
import { loginUser } from '../entidades/loginUser';
import { Observable } from 'rxjs';
import { Medicos } from '../entidades/Medicos';
import { Disponibilidad } from '../entidades/Disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class ConsultasBackServiceService {

 private APIURL: string = "https://leandro_alderete-proyecto.mdbgo.io";
 //private APIURL: string = "http://localhost:3000";


  constructor(public http: HttpClient) { }


  public registrar(usuario: Usuario) {
    return this.http.post(this.APIURL + "/insertar", usuario);
  }

  public registrarMedic(usuario: Usuario) {
    return this.http.post(this.APIURL + "/insertarMedic", usuario);
  }
  public login(loginUsuario: loginUser): Observable<loginUser[]> {
    console.log(this.APIURL + "/loguear")
    return this.http.post<loginUser[]>(this.APIURL + "/loguear", loginUsuario);

  }

  public buscarMedic() {

    return this.http.get<Medicos[]>(this.APIURL + "/Medicos")
  }

  public updateMedico(medico: Medicos) {
    return this.http.post(this.APIURL + "/estadoMedico", medico);
  }

  public getAvailability(specialty: String) {

    return this.http.get<Disponibilidad[]>(`${this.APIURL}/disponibilidadPorEsp?especialidad=${specialty}`);
  }
  getCalificacionesPorAfiliado(id_paciente: number): Observable<any[]> {
    const url = `${this.APIURL}/calificaciones?id_paciente=${id_paciente}`;
    console.log("url completa : ", url);
    return this.http.get<any[]>(url);
  }
  getHistorialTurnos(id_paciente: number, opcion: number): Observable<any[]> {
    const url = `${this.APIURL}/historialTurnos/${id_paciente}?opcion=${opcion}`;
    return this.http.get<any>(url);
  }
  sendCalification(calificacionn: any): Observable<any[]> {
    const url = `${this.APIURL}/enviarCalificacion`;
    const body = calificacionn;
    return this.http.post<any>(url, body);
  }
  guardarTurno(turno: { dni_paciente: any; dni_medico: any; fechaturno: string | null; hora: string | null; }): Observable<any> {
    return this.http.post<any>(`${this.APIURL}/guardarTurno`, turno);
  }
  getHour(dni_medico: number, fecha: string): Observable<any[]> {
    const url = `${this.APIURL}/turnosTomados?medicoId=${dni_medico}&dia=${fecha}`;
    console.log("url final", url);
    return this.http.get<any>(url);
  }

  guardarDisponibilidad(disponibilidad: any): Observable<any[]> {
    console.log("disponibilidad", disponibilidad);
    return this.http.post<any>(`${this.APIURL}/guardarDisponibilidad`, disponibilidad);
  }
  getTurnosPaciente(dni_medico: any): Observable<any[]> {
    const url = `${this.APIURL}/turnosTomadosCSV?dni_medico=${dni_medico}`;
    console.log("dni_medico : ", dni_medico);
    return this.http.get<any[]>(url);
  }

  getMedicoById(id_medico: number): Observable<any[]> {
    const url = `${this.APIURL}/medicosById?id_medico=${id_medico}`;
    return this.http.get<Medicos[]>(url);
  }

  updateTurno(id: any,option: any){
    console.log("update turnos", id +"---"+ option);
    
    return this.http.put(`${this.APIURL}/updateTurno?id=${id}&option=${option}`,null);
  }
}
