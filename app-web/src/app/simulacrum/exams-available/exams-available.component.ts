import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt, faList } from '@fortawesome/free-solid-svg-icons';
import { QuestionsService } from '../../maintainers/questions/questions.service';
import { ExamObservable } from '../exam/exam.observable';
import { Router } from '@angular/router';
import { Exam } from '../../core/models/exam.model';
import { AuthService } from '../../auth.service';
import { CategoriesService } from '../../maintainers/categories/categories.service';
import { UsersService } from '../../maintainers/users/users.service';
import { UserAuth } from '../../core/models/userAuth.model';

@Component({
  selector: 'app-exams-available',
  templateUrl: './exams-available.component.html',
  styleUrls: ['./exams-available.component.css']
})
export class ExamsAvailableComponent implements OnInit {

  private questions: any[] = [];
  private questionsAvailable: any[] = [];

  public categories: any[] = [];
  // public categories: any[] = [
  //   {name: 'PSM', clientKey: 'PSM', totalQuestions: 80, durationTimeMM: 60},
  //   {name: 'PMI ACP', clientKey: 'PMI_ACP', totalQuestions: 120, durationTimeMM: 120}
  // ];

  public typeAnswers = [
    { id: 1, key: 'TRUE_OR_FALSE', name: 'Verdadero ó Falso', input: 'radio', class: 'custom-radio'},
    { id: 2, key: 'ONE_ANSWER', name: 'Una respuesta', input: 'radio', class: 'custom-radio'},
    { id: 2, key: 'MULTIPLE_ANSWER', name: 'Múltiples respuestas', input: 'checkbox', class: 'custom-checkbox'},
  ];

  public letter = ['','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(
    private questionsService: QuestionsService,
    private examObservable: ExamObservable,
    private router: Router,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {
    library.add(faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt, faList);
  }

  ngOnInit() {
    const that = this;
    const userAuth: UserAuth = JSON.parse(localStorage.getItem('user'));
    that.authService.CurrentUserData(userAuth.uid).subscribe( res => {
      that.categoriesService.read(res[0].data.assignedTests[0].key).subscribe(cat => {
        console.log(cat);
        that.categories.push(cat);
      });
    });
  }

  public logout() {
    const that = this;
    that.authService.SignOut();
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

      let n = 0;
      that.questionsAvailable = that.questions.sort((a, b) => 0.5 - Math.random()).slice(0, category.totalQuestions);
      that.questionsAvailable.forEach(question => {
        question.idx = n += 1;
        question.input = that.typeAnswers.find(f => f.key === question.typeAnswer).input;
        question.class = that.typeAnswers.find(f => f.key === question.typeAnswer).class;
        question.toggleAnswer = false;
        let i = 0;
        question.answers.forEach(answer => {
          answer.userIsCorrect = null;
          answer.idx = i += 1;
          answer.letter = this.letter[answer.idx];
        });
      });

      exam.questionsAvailable = that.questionsAvailable;

      exam.durationTime = '23:59:00';

      that.examObservable.changeQuestions(exam);
      this.router.navigate(['/simulacrum/exam']);

    }, (err) => {}, () => {

      // console.log(that.questionsAvailable);
    });

    // if (category.clientKey === 'PSM') {

    // } else if (category.clientKey === 'PMI_ACP') {

    // }

  }

}
