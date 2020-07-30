import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificatePlanService {

  constructor() { }

  // verificarPlanPorDia(dateTo: any, planEnDias: any): boolean
  // {
  //   let dias = 0;
  //   let dateFrom: any = this.fechaActual();
  //   const aFecha1 = dateTo.split('/');
  //   const aFecha2 = dateFrom.split('/');
  //   const fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
  //   const fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
  //   const dif = fFecha2 - fFecha1;
  //   dias = Math.floor(dif / (1000 * 60 * 60 * 24));
  //   return (dias > planEnDias)? false : true;
  // }

  // fechaActual(): string {
  //   let fechaActual = new Date(); // Fecha actual
  //   const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Formato dd/mm/yyyy
  //   const [{ value: day },,{ value: month },,{ value: year }] = dateTimeFormat.formatToParts(fechaActual); 
  //   return `${day}/${month}/${year}`;
  // }

  // fechaRegistro(createdAt: any) {
  //   let fechaActual = new Date(createdAt); // Fecha actual
  //   const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Formato dd/mm/yyyy
  //   const [{ value: day },,{ value: month },,{ value: year }] = dateTimeFormat.formatToParts(fechaActual); 
  //   return `${day}/${month}/${year}`;
  // }

  
  formatUpdate(getTime: number): string {
    let fechaActual = new Date(getTime); // Fecha actual
    const dateTimeFormat = new Intl.DateTimeFormat('es', { year: 'numeric', month: '2-digit', day: '2-digit' }); // Formato dd/mm/yyyy
    const [{ value: day },,{ value: month },,{ value: year }] = dateTimeFormat.formatToParts(fechaActual); 
    return `${year}-${month}-${day}T23:59:59`;
  }


  incrementarPlan(createdAt: any, dias: number): number {
    let fechaRegistro = new Date(createdAt); // Fecha actual
    fechaRegistro.setDate(fechaRegistro.getDate() + dias);
    return fechaRegistro.getTime();
  }

  verificarPlanPorFecha(fechaExpiracion: number): boolean
  {

    let fechaActual = new Date();
    if(fechaActual.getTime() > fechaExpiracion) {
      return false;
    }

    return true;
  }

}
