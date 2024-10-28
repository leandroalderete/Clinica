import { Injectable } from '@angular/core';
import  jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ExportarPDFService {

  constructor() { }

public exportTopdf(csv: string , fileName:string){  

  const a = document.createElement('a');
  const blob = new  Blob([csv],{type:'text/csv'});
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

/*public PDFExport(fileName:string){

 let pdf = new jspdf('1','cm','a4');
  pdf.text  ("hola mundo",1,1 );
  pdf.text  ("hola mundo2",55,60 );
  pdf.text  ("hola mundo3" ,30,40);
  pdf.text  ("hola mundo4",10,5 ); 

  pdf.save(fileName);
}*/


}
