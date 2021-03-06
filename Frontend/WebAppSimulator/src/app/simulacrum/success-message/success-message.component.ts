import { ExamObservable } from './../exam/exam.observable';
import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faSignOutAlt, faTimes, faListAlt, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SharedObservable } from '../../observables/shared.observable';
import { AuthService } from '../../auth.service';

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
    private authService: AuthService
  ) {
    library.add(faCheckCircle, faSignOutAlt, faTimes, faListAlt, faSortDown, faSortUp);
  }

  ngOnInit() {
    const that = this;
    that.suscription = that.examObservable.currentQuestions.subscribe( res => {
      if (res) {
        console.log(res);
        that.exam = res;
        // localStorage.setItem('exam', JSON.stringify(that.exam));

        // that.exam = JSON.parse(localStorage.getItem('exam'));
        that.exam.percentage = Math.floor(that.exam.percentage);
      }
    });
    // that.exam = JSON.parse(localStorage.getItem('exam'));
    // that.exam.questionsAvailable.forEach(question => {
    //   question.toggleAnswer = false;
    // });
    // localStorage.setItem('exam', JSON.stringify(that.exam));
    // that.exam = JSON.parse(localStorage.getItem('exam'));
    // that.exam.percentage = Math.floor(that.exam.percentage);
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
        // question.toggleAnswer = false;
        question.answers.forEach(answer => {
          answer.userIsCorrect = null;
        });
      });
      that.authService.SignOut();
    }
  }

  public toggleAnswer(event, question) {
    event.preventDefault();
    if (question.toggleAnswer === false) {
      question.toggleAnswer = true;
    } else {
      question.toggleAnswer = false;
    }
  }

}
