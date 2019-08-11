import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt, faList } from '@fortawesome/free-solid-svg-icons';
import { LogoutUser } from '../../commons/logoutUser';
import { QuestionsService } from '../../maintainers/questions.service';
import { ExamObservable } from '../exam/exam.observable';
import { Router } from '@angular/router';
import { Exam } from '../../core/models/exam.model';

@Component({
  selector: 'app-exams-available',
  templateUrl: './exams-available.component.html',
  styleUrls: ['./exams-available.component.css']
})
export class ExamsAvailableComponent implements OnInit {

  private questions: any[] = [];
  private questionsAvailable: any[] = [];

  public categories: any[] = [
    {name: 'PSM', clientKey: 'PSM', totalQuestions: 80, durationTimeMM: 60},
    {name: 'PMI ACP', clientKey: 'PMI_ACP', totalQuestions: 120, durationTimeMM: 120}
  ];

  constructor(
    private logoutUser: LogoutUser,
    private questionsService: QuestionsService,
    private examObservable: ExamObservable,
    private router: Router
  ) {
    library.add(faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt, faList);
  }

  ngOnInit() {
    const that = this;

  }

  public logout() {
    const that = this;
    that.logoutUser.clearSession();
  }

  public startExam(category: any) {
    const that = this;

    const exam: Exam = {
      category: null,
      durationTime: null,
      questionsAvailable: []
    };

    exam.category = category;

    that.questions = [];
    this.questionsService.list().subscribe( res => {

      const questions: any = res;
      
      for(let key in questions) {
        const question: any = res[key];
        question.key = key;
        that.questions.push(questions[key]);
      }

      that.questionsAvailable = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, category.totalQuestions);

      exam.questionsAvailable = that.questionsAvailable;

    }, (err) => {}, () => {

      exam.durationTime = '23:59:00';

      that.examObservable.changeQuestions(exam);
      this.router.navigate(['/simulacrum/exam']);
      // console.log(that.questionsAvailable);
    });

    // if (category.clientKey === 'PSM') {

    // } else if (category.clientKey === 'PMI_ACP') {

    // }

  }

}
