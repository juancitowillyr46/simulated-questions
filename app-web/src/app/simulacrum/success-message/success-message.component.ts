import { ExamObservable } from './../exam/exam.observable';
import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SharedObservable } from '../../observables/shared.observable';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  public exam = null;
  private suscription: Subscription = null;
  constructor(
    private examObservable: ExamObservable,
    private sharedObservable: SharedObservable
  ) {
    library.add(faCheckCircle, faSignOutAlt, faTimes);
  }

  ngOnInit() {
    const that = this;
    that.suscription = that.examObservable.currentQuestions.subscribe( res => {
      if (res) {
        console.log(res);
        that.exam = res;
        that.exam.percentage = Math.floor(that.exam.percentage);
      }
    });
  }

  public cerrar() {
    const that = this;
    if (that.suscription !== null) {
      that.suscription.unsubscribe();
      that.suscription = null;
      that.exam.percentage = 0;
      that.exam.questionsAvailable.forEach(question => {
        question.answersCorrects = 0;
        question.answersIncorrects = 0;
        question.answersNulls = 0;
        question.questionApproved = false;
        question.answers.forEach(answer => {
          answer.userIsCorrect = null;
        });
      });
      that.sharedObservable.changeHeaderUser(null);
    }
  }

}
