import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultasBackServiceService } from '../../servicio/consultas-back-service.service';
import { Usuario } from '../../entidades/Usuario';
import { ngxCsv } from 'ngx-csv';
import { Medicos } from '../../entidades/Medicos';


@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent {
  showDisponibilidadForm = false;
  showTurnosList = false;
  turnos: any[] = [];
  usuario: any;
  isModalOpen = false;
  opcionSeleccionada = '';
  turnoSeleccionado: any = null;

  disponibilidad = {
    horaDesde: '',
    horaHasta: '',
    dias: []
  };

  constructor(
    private consultaBackApi: ConsultasBackServiceService,
    private router: Router,
  ) {
    const userData = sessionStorage.getItem('USER_DATA');
    if (userData) {
      this.usuario = JSON.parse(userData);
    } else {
      console.error('No se encontraron datos de usuario en sessionStorage');
    }
  }

  // Mostrar u ocultar el formulario de disponibilidad
  toggleDisponibilidadForm() {
    this.showDisponibilidadForm = !this.showDisponibilidadForm;
    if (this.showDisponibilidadForm) {
      this.showTurnosList = false; // Ocultar la lista de turnos si se muestra el formulario
    }
  }

  // Mostrar u ocultar la lista de turnos
  toggleTurnosList() {
    this.showTurnosList = !this.showTurnosList;
    if (this.showTurnosList) {
      this.showDisponibilidadForm = false; // Ocultar el formulario si se muestra la lista de turnos
    }

    if (this.showTurnosList) {
      this.obtenerTurnos(); // Obtener turnos solo si se muestra la lista
    }
  }

  // Obtener los turnos
  obtenerTurnos() {
    this.consultaBackApi.getTurnosPaciente(this.usuario.dni).subscribe(
      (response: any) => {
        this.turnos = response;
      },
      error => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }

  // Enviar disponibilidad
  enviarDisponibilidad() {
    this.consultaBackApi.getMedicoById(this.usuario.dni).subscribe(
      (medicos: Medicos[]) => {
        const disponibilidadCompleta = {
          ...this.disponibilidad,
          dni_medico: medicos[0].dni,
          especialidad: medicos[0].especialidad,
        };
    
        this.consultaBackApi.guardarDisponibilidad(disponibilidadCompleta).subscribe(
          response => {
            console.log('Disponibilidad guardada exitosamente:', response);
          },
          error => {
            console.error('Error al guardar disponibilidad:', error);
          }
        );
      }
    );
  }

  // Método para generar y descargar el CSV
  generarCSV() {
    const csvData = this.turnos.map(turno => ({
      DNI: turno.dni_paciente || '',
      Nombre: turno.Afiliado || '',
      Fecha: turno.fechaturno || '',
      Hora: turno.hora || '',
      Estado: turno.estado || ''
    }));

    const csvOptions = {
      filename: 'turnos',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Lista de Turnos para el Medico: ' + this.turnos[0].Medico,
      useBom: true,
      headers: ["DNI", "Nombre", "Fecha", "Hora", "Estado"]
    };

    new ngxCsv(csvData, csvOptions.filename, csvOptions);
  }

  openModal(turno: any) {
    this.turnoSeleccionado = turno;
    this.isModalOpen = true;
    console.log("is model open valor :", this.isModalOpen);
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
    this.opcionSeleccionada = ''; // Limpiar la opción seleccionada
  }

  // Método para manejar el envío de las opciones
  enviarOpciones() {
    if (this.opcionSeleccionada) {
      console.log('Turno seleccionado:', this.turnoSeleccionado);
      console.log('Opción seleccionada:', this.opcionSeleccionada);

      this.consultaBackApi.updateTurno(this.turnoSeleccionado.id_turno,this.opcionSeleccionada).subscribe();

      this.closeModal(); // Cerrar el modal después de enviar
    } else {
      console.error('Debe seleccionar una opción.');
    }
  }
}
