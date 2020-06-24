import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsTypesService {

  constructor() { }

  public getTypesQuestion() {
    return [
      { 'id': 1, 'key': 'TRUE_OR_FALSE', 'name': 'Verdadero ó Falso', 'input' : 'radio' },
      { 'id': 2, 'key': 'ONE_ANSWER', 'name': 'Una respuesta', 'input' : 'radio' },
      { 'id': 2, 'key': 'MULTIPLE_ANSWER', 'name': 'Múltiples respuestas', 'input' : 'checkbox' },
    ];
  }

}
