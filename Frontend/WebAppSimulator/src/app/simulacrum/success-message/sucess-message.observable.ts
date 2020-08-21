import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class SuccessMessageObservable {

  private questions = new BehaviorSubject(null);
  public currentQuestions = this.questions.asObservable();

  changeQuestions(value) {
   this.questions.next(value);
  }


}
