import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { QuestionsService } from '../questions.service';
import { MessageObservable } from '../../../observables/message.observable';
// import {
//   faTimes,
//   faPlus,
//   faInfoCircle,
//   faCheckCircle,
//   faCheck,
//   faPen,
//   faTrash,
//   faArrowCircleLeft,
//   faBan,
//   faFilter,
//   faSync,
//   faSpinner
// } from '@fortawesome/free-solid-svg-icons';
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

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private messageObservable: MessageObservable
  ) {
    // library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft, faBan, faFilter, faSync, faSpinner);
  }

  ngOnInit() {
    const that = this;
    that.list();
    that.messageObservable.currentMessage.subscribe(res => {
      if (res) {
        that.message = res;
      }
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
        question.key = key$;
        that.questions.push(questions[key$]);

        if (that.filterBy === 'H') {
          that.questions = that.questions.filter(f => f.state !== false );
        } else if (that.filterBy === 'D') {       
          that.questions = that.questions.filter(f => f.state === false );
        }
      };
      that.inProgress = false;
    });
  }

  public form(id: number, event) {
    event.preventDefault();
    this.router.navigate(['/questions/post/', id]);
  }

  public ir($event) {
    this.router.navigate(['/questions/post/', '0']);
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

  public filter(type: string) {
    const that = this;
    // let questions = that.questions;
    that.filterBy = type;
    that.list();
    // if(type == 'ALL') {
    //   that.list();
    // } else if (type == 'H') {
    //   if(questions) {
    //     that.questions = questions;
    //   } 
    //   that.questions = that.questions.filter(f => f.state !== false );
    // } else if (type == 'D') {       
    //   if(questions) {
    //     that.questions = questions;
    //   } 
    //   that.questions = that.questions.filter(f => f.state === false );
    // }
    
  }

}
