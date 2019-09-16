import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { QuestionsService } from '../questions.service';
import { MessageObservable } from '../../../observables/message.observable';

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
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  public questions = [];
  public message: any = null;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private messageObservable: MessageObservable
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
    this.router.navigate(['/questions/post/', id]);
  }

  public ir() {
    this.router.navigate(['/questions/post/', '0']);
  }

}
