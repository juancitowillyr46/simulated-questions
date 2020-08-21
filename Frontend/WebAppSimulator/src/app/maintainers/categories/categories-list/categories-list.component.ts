import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { CategoriesService } from '../categories.service';
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
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  public categories = [];
  public message: any = null;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private messageObservable: MessageObservable
  ) {
    library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft);
  }

  ngOnInit() {
    const that = this;

    // const category = {name: 'PSM', clientKey: 'PSM', totalQuestions: 80, durationTimeMM: 60};
    // this.categoriesService.create(category).subscribe(res => {
    //   console.log(res);
    // });

    // const category1 = {name: 'EXAMEN', clientKey: 'EXAMEN', totalQuestions: 20, durationTimeMM: 60};
    // this.categoriesService.create(category1).subscribe(res => {
    //   console.log(res);
    // });

    this.categoriesService.list().subscribe( res => {
      const categories: any = res;
      that.categories = [];
      for (let key$ in categories) {
        const category: any = res[key$];
        // if(question.typeAnswer === 'TRUE_OR_FALSE'){
        //   question.typeAnswer = 'Verdadero ó Falso';
        // } else if(question.typeAnswer === 'ONE_ANSWER'){
        //   question.typeAnswer = 'Una respuesta';
        // } else if(question.typeAnswer === 'MULTIPLE_ANSWER'){
        //   question.typeAnswer = 'Múltiples respuestas';
        // }
        category.key = key$;
        that.categories.push(categories[key$]);
      };
    });

    that.messageObservable.currentMessage.subscribe(res => {
      if (res) {
        console.log(res);
        that.message = res;
      }
    });
  }

  // public form(id: number, event) {
  //   event.preventDefault();
  //   this.router.navigate(['/questions/post/', id]);
  // }

  public ir($event) {
    this.router.navigate(['/categories/post/', '0']);
  }

}
