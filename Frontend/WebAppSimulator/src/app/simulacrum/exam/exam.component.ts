import { Component, OnInit, OnDestroy } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ExamObservable } from './exam.observable';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Exam } from '../../core/models/exam.model';
import { AuthService } from '../../auth.service';
import {
  faPlay,
  faClock,
  faListUl,
  faList,
  faHome,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faSave,
  faPaperPlane,
  faPen,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {

  public nextQuestion = false;

  public typeAnswers = [
    { id: 1, key: 'TRUE_OR_FALSE', name: 'Verdadero ó Falso', input: 'radio', class: 'custom-radio'},
    { id: 2, key: 'ONE_ANSWER', name: 'Una respuesta', input: 'radio', class: 'custom-radio'},
    { id: 2, key: 'MULTIPLE_ANSWER', name: 'Múltiples respuestas', input: 'checkbox', class: 'custom-checkbox'},
  ];

  public exam: Exam = null;
  public currentQuestion = null;
  public questionNext = 0;
  public questionLast = 0;
  public questionCurrent = 0;
  // public justification = '';

  constructor(
    private examObservable: ExamObservable,
    private router: Router,
    // private authService: AuthService
  ) {
    library.add(
      faPlay,
      faClock,
      faListUl,
      faHome,
      faArrowAltCircleLeft,
      faArrowAltCircleRight,
      faSave,
      faPaperPlane,
      faPen,
      faList,
      faPowerOff);
  }

  ngOnInit() {
    const that = this;

    that.examObservable.currentQuestions.subscribe( res => {
      if (res) {

        that.exam = res;

        try {

          that.questionNext = 0;
          that.questionLast = (that.exam.questionsAvailable.length - 1);

          // let n = 0;
          // that.exam.questionsAvailable.forEach(question => {
          //   question.idx = n += 1;
          //   question.input = that.typeAnswers.find(f => f.key === question.typeAnswer).input;
          //   question.class = that.typeAnswers.find(f => f.key === question.typeAnswer).class;
          //   question.answers.forEach(answer => {
          //     // answer.userIsCorrect = null;
          //   });
          // });



          that.currentQuestion = that.exam.questionsAvailable[that.questionCurrent];

          console.log(that.exam.questionsAvailable);

        } catch (error) {
          // console.log(error);
        }

      }
    });
  }

  public next() {
    const that = this;
    // that.exam.questionsAvailable[that.questionCurrent]['justification'] = that.justification;
    that.questionCurrent = that.questionCurrent + 1;
    that.currentQuestion = that.exam.questionsAvailable[that.questionCurrent];
    // that.justification = '';
  }

  public last() {
    const that = this;
    that.questionCurrent = that.questionCurrent - 1;
    that.currentQuestion = that.exam.questionsAvailable[that.questionCurrent];
    // that.justification = '';
  }

  public isCorrectEvent(event, answer, idx, index) {
    const that = this;

    if (that.currentQuestion.input === 'radio') {
      that.exam.questionsAvailable[index].answers.forEach(aq => {
        aq.userIsCorrect = null;
      });
      that.currentQuestion.answers.forEach(aw => {
        aw.userIsCorrect = null;
      });
    }

    answer.userIsCorrect = event.target.checked;

  }


  public finishExam() {
    const that = this;
    const exameEdit = that.exam;
    exameEdit.percentage = 0;
    exameEdit.questionsAvailable.forEach(q => {

      q.answersCorrects = 0;
      q.answersIncorrects = 0;
      q.answersNulls = 0;
      q.questionApproved = false;

      q.correctAnswers = q.answers.filter(a => a.isCorrect === true);

      q.answers.forEach(answer => {
        // Respuestas Correctas
        if (answer.isCorrect === answer.userIsCorrect && answer.userIsCorrect !== null) {
          q.answersCorrects = q.answersCorrects + 1;
        // Respuestas Incorrectas
        } else if (answer.userIsCorrect !== answer.isCorrect && answer.userIsCorrect !== null) {
          q.answersIncorrects = q.answersIncorrects + 1;
        // Respuestas Nulas
        } else if (answer.userIsCorrect === null) {
          q.answersNulls = q.answersNulls + 1;
        }
      });

      if (q.correctAnswers.length === q.answersCorrects) {
        q.questionApproved = true;
      }


      // console.log(q);

    });

    // console.log(exameEdit.questionsAvailable.filter(p => p.questionApproved === true));
    const questionApproved = exameEdit.questionsAvailable.filter(p => p.questionApproved === true).length;
    exameEdit.percentage = Math.round((questionApproved / exameEdit.questionsAvailable.length) * 100);
    console.log(exameEdit);
    that.examObservable.changeQuestions(exameEdit);
    that.router.navigate(['/simulacrum/success-message']);
  }


  ngOnDestroy(): void {
    const that = this;
    // if (that.subscription !== null) {
    //   that.subscription.unsubscribe();
    //   that.subscription = null;
    // }
  }

}
