import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from './questions.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageObservable } from '../../observables/message.observable';
import {
  faTimes,
  faPlus,
  faInfoCircle,
  faCheckCircle,
  faCheck,
  faPen,
  faTrash,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions = [];
  public message: any = null;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private messageObservable: MessageObservable,
  ) {
    library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft);
  }

  ngOnInit() {
    const that = this;
    this.questionsService.list().subscribe( res => {
      const questions: any = res;
      that.questions = [];
      for (let key$ in questions) {
        const question: any = res[key$];
        if(question.typeAnswer === 'TRUE_OR_FALSE'){
          question.typeAnswer = 'Verdadero ó Falso';
        } else if(question.typeAnswer === 'ONE_ANSWER'){
          question.typeAnswer = 'Una respuesta';
        } else if(question.typeAnswer === 'MULTIPLE_ANSWER'){
          question.typeAnswer = 'Múltiples respuestas';
        }
        question.key = key$;
        that.questions.push(questions[key$]);
      };
    });

    that.messageObservable.currentMessage.subscribe(res => {
      if (res) {
        that.message = res;
      }
    });
  }

  public form(id: number, event) {
    event.preventDefault();
    this.router.navigate(['/mantainers/questions/form/', id]);
  }

  public ir($event) {
    this.router.navigate(['/mantainers/questions/form/', '0']);
  }

}
