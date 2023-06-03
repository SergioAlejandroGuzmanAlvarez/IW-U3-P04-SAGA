import { Injectable } from '@angular/core';
import { Calification } from '../models/calification';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {

  private califications: Calification[] = [];



  constructor() {
    this.califications.push( {
        name: 'Alejandro Guzman',
        coment: 'El producto estaba aceptable, la entrega fue rápida.',
        calification: 5,
        fecha: new Date()
      },
      {
        name: 'Karla Reyes',
        coment: 'Me encanto, lo compraria de nuevo sin dudas.',
        calification: 5,
        fecha: new Date()
      },
      {
        name: 'Jesús Altair',
        coment: 'No era lo que esperaba, es lo peor....',
        calification: 5,
        fecha: new Date()
      })
  }

  public getCalifications() {
    return this.califications;
  }

}
