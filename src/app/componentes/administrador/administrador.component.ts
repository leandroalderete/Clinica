import { Component } from '@angular/core';
import { MedicosPipe } from '../../pipes/medicos.pipe'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { pipe } from 'rxjs';
import { Usuario } from '../../entidades/Usuario';
import { Medicos } from '../../entidades/Medicos';
import { ConsultasBackServiceService } from '../../servicio/consultas-back-service.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [FormsModule, CommonModule, MedicosPipe,],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  toggleHabilitado(medico: Medicos) {
    if (medico.habilitado == 'deshabilitado') {
      medico.habilitado = 'habilitado'
      console.log("entro en if ")

    } else {
      console.log("entro en else ")
      medico.habilitado = 'deshabilitado'
    }

    this.consultaMedic.updateMedico(medico).subscribe();


  }
 
  public valorfiltro: string = '';

  public medicos: Medicos[] = [];

  constructor(public consultaMedic: ConsultasBackServiceService) {

    consultaMedic.buscarMedic().subscribe(
      (medicos: Medicos[]) => {
        this.medicos = medicos
      }
    )

  }
// Método para generar PDF
generarPDF() {
  const data = document.getElementById('medicosTable'); // Obtener el elemento de la tabla
  const logoUrl = '../../../assets/logo2.png'; // Ruta del logo

  // Cargar la imagen del logo antes de generar el PDF
  const img = new Image();
  img.src = logoUrl;
  img.onload = () => {
    html2canvas(data!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgWidth = 190; // Ancho del PDF
      const pageHeight = pdf.internal.pageSize.height; // Altura de la página
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajustar altura de imagen
      let heightLeft = imgHeight;

      let position = 0;

      // Agregar el logo en la parte superior del PDF (x: 10, y: 10, tamaño ajustado)
      pdf.addImage(img, 'PNG', 10, 10, 40, 30); // Cambia el tamaño y posición según tus necesidades

      // Espacio entre el logo y la tabla
      position = 40; // Espacio desde la parte superior después del logo

      // Agregar la tabla al PDF después del logo
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Agregar más páginas si la tabla es más larga que una página
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      console.log("PDF generado con logo");
      pdf.save('medicos.pdf'); // Guardar el PDF con el logo
    });
  };
}
}
