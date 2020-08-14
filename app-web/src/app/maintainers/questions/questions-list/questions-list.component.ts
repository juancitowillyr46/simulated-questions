import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { MessageObservable } from '../../../observables/message.observable';
import { CategoriesService } from '../../categories/categories.service';
import { QuestionsTypesService } from '../../questions-types/questions-types.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

  public questions = [];
  public message: any = null;
  public selectedItemForDeleteArr = [];
  public filterBy = '';
  public inProgress;
  public inProgressSelect;
  public categories = [];
  public typesQuestions = [];
  public idioma: string = '1';

  public filters = {
    category: '',
    typeAnswerKey: '',
    isTranslate: '',
    isJustification: ''
  };

  public resultFilter = [];

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private messageObservable: MessageObservable,
    private categoriesServices: CategoriesService,
    private questionsTypesService: QuestionsTypesService
  ) {
    
  }

  ngOnInit() {
    const that = this;
    that.getTypeQuestion();
    that.getCategoriesActive();
    that.list();
    that.messageObservable.currentMessage.subscribe(res => {
      if (res) {
        that.message = res;
      }
    });
  }

  public getTypeQuestion() {
    const that = this;
    that.typesQuestions = that.questionsTypesService.getTypesQuestion();
  }


  public getCategoriesActive() {
    const that = this;
    that.inProgressSelect = true;
    that.categories = [];
    that.categoriesServices.all().subscribe( res => {
      that.inProgressSelect = false;
      that.categories = res;
    });

  }

  public list(){
    const that = this;
    that.inProgress = true;
    this.questionsService.list().subscribe( res => {
      const questions: any = res;
      that.questions = [];
      for (let key$ in questions) {
        const question: any = res[key$];
        if(question.typeAnswer === 'TRUE_OR_FALSE'){
          question.typeAnswer = 'Verdadero ó Falso';
          question.typeAnswerKey ='TRUE_OR_FALSE';
        } else if(question.typeAnswer === 'ONE_ANSWER'){
          question.typeAnswer = 'Una respuesta';
          question.typeAnswerKey ='ONE_ANSWER';
        } else if(question.typeAnswer === 'MULTIPLE_ANSWER'){
          question.typeAnswer = 'Múltiples respuestas';
          question.typeAnswerKey ='MULTIPLE_ANSWER';
        }

        if(question.questionEn !== undefined && question.questionEn != ''){ 
          question.isTranslate = '1';
        } else {
          question.isTranslate = '0';
        }

        if(question.justification !== undefined && question.justification != ''){ 
          question.isJustification = '1';
        } else {
          question.isJustification = '0';
        }

        question.key = key$;
        that.questions.push(questions[key$]);
        if (that.filterBy === 'H') {
          that.questions = that.questions.filter(f => f.state !== false );
        } else if (that.filterBy === 'D') {       
          that.questions = that.questions.filter(f => f.state === false );
        }
      };
      that.resultFilter = that.questions;
      that.inProgress = false;
    });
  }

  public form(id: number, event) {
    event.preventDefault();
    this.router.navigate(['/manager/questions/', id]);
  }

  public ir($event) {
    this.router.navigate(['/manager/questions/', '0']);
  }

  public deleteAll($event) {
    const that = this;
    var confirmx = confirm("¿Estás seguro que deseas eliminar las preguntas?");
    if (confirmx == true) {
      
      this.selectedItemForDeleteArr.forEach(element => {
        this.questionsService.delete(element).subscribe( res => { 
          alert('Eliminados satisfactoriamente');
          that.list();
          this.selectedItemForDeleteArr = [];
        });
      });
    } else {
      
    }
  }

  public inactiveAll($event) {
    const that = this;
    var confirmx = confirm("¿Estás seguro que deseas deshabilitar las preguntas?");
    if (confirmx == true) {
      // console.log(that.questions);
      let result = 0;
      this.selectedItemForDeleteArr.forEach(element => {
        let getGuestion = that.questions.find(f => f.key === element);
        getGuestion['state'] = false;
        getGuestion['typeAnswer'] = getGuestion.typeAnswerKey;
        result = result + 1;
        that.questionsService.update(element, getGuestion).subscribe(res => {
          that.list();
        });
        // console.log(that.questions.find(f => f.key === element));
      });
      if(result > 0){
        alert('Deshabilitas satisfactoriamente');
        this.selectedItemForDeleteArr = [];
        
      }


    } else {
      
    }
  }

  
  public ActiveAll($event) {
    const that = this;
    var confirmx = confirm("¿Estás seguro que deseas habilitar las preguntas?");
    if (confirmx == true) {
      // console.log(that.questions);
      let result = 0;
      this.selectedItemForDeleteArr.forEach(element => {
        let getGuestion = that.questions.find(f => f.key === element);
        getGuestion['state'] = true;
        getGuestion['typeAnswer'] = getGuestion.typeAnswerKey;
        // typeAnswerx
        result = result + 1;
        that.questionsService.update(element, getGuestion).subscribe(res => {
          that.list();
        });
        // console.log(that.questions.find(f => f.key === element));
      });
      if(result > 0){
        alert('Habilitadas satisfactoriamente');
        this.selectedItemForDeleteArr = [];
        
      }


    } else {
      
    }
  }

  public selectedItemForDelete($event) {

    if($event.target.checked) {

      if(!this.selectedItemForDeleteArr.find(key => key == $event.target.value)){
        this.selectedItemForDeleteArr.push($event.target.value);
      }

    } else {
      var index = this.selectedItemForDeleteArr.indexOf($event.target.value);
      this.selectedItemForDeleteArr.splice(index, 1);

      
    }
    // console.log(this.selectedItemForDeleteArr);

  }

  public filter(evt: any, input: string) {
    const that = this;

    that.resultFilter = that.questions.filter( res => { 
      for (const key in that.filters) {
        if (key === 'category' && res[key] === undefined || res[key] !== that.filters[key]) {
          if ( that.filters[key] !== undefined) {
            const value: string = (res[key] !== undefined)? res[key].toUpperCase() : '';
            const find = value.indexOf(that.filters[key]);
            if ( find < 0 ) {
              return false;
            }
          }
        } else if (key === 'typeAnswerKey' && res[key] === undefined || res[key] !== that.filters[key]) {
          if ( that.filters[key] !== undefined) {
            const value: string = (res[key] !== undefined)? res[key].toUpperCase() : '';
            const find = value.indexOf(that.filters[key]);
            if ( find < 0 ) {
              return false;
            }
          }
        } else if (key === 'isTranslate' && res[key] === undefined || res[key] !== that.filters[key]) {
          if ( that.filters[key] !== undefined) {
            const value: string = (res[key] !== undefined)? res[key].toUpperCase() : '';
            const find = value.indexOf(that.filters[key]);
            if ( find < 0 ) {
              return false;
            }
          }
        } else if (key === 'isJustification' && res[key] === undefined || res[key] !== that.filters[key]) {
          if ( that.filters[key] !== undefined) {
            const value: string = (res[key] !== undefined)? res[key].toUpperCase() : '';
            const find = value.indexOf(that.filters[key]);
            if ( find < 0 ) {
              return false;
            }
          }
        }
      }
      return true;
    });

    // if(that.filters.questionEn === '1') {
    //   that.resultFilter = that.resultFilter.filter( f => f.questionEn !== undefined);
    // } else if(that.filters.questionEn === '0') {
    //   that.resultFilter = that.resultFilter.filter( f => f.questionEn === undefined);
    // }
    
    // if(that.filters.justification === '1') {
    //   that.resultFilter = that.resultFilter.filter( f => f.justification !== undefined);
    // } else if(that.filters.justification === '0') {
    //   that.resultFilter = that.resultFilter.filter( f => f.justification === undefined);
    // }

  }

  filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }
  


}
