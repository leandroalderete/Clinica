import { Pipe, PipeTransform } from '@angular/core';
import { Medicos } from '../entidades/Medicos';

@Pipe({
  name: 'medicos',
  standalone: true
})
export class MedicosPipe implements PipeTransform {

  transform(medicos: Medicos[], filtro:String): any {
    return medicos.filter(medico =>
      medico.especialidad.toLowerCase ().includes(filtro.toLowerCase()) 
      //medico.especialidad.toLowerCase() 
      
      
    );
  }

}
