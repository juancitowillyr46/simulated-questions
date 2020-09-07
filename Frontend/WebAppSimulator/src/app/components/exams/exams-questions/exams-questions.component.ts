import { Component, OnInit, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/maintainers/questions/questions.service';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
import { ExamProgressBarObservable } from 'src/app/core/observables/exam-progress-bar.observable';
import { ExamClearTimerObservable } from 'src/app/core/observables/exam-clear-timer.observable';
import { UsersService } from 'src/app/maintainers/users/users.service';
import { LoginService } from 'src/app/login/login.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IsEndExamObservable } from 'src/app/core/observables/is-end-exam.observable';

@Component({
  selector: 'app-exams-questions',
  templateUrl: './exams-questions.component.html',
  styleUrls: ['./exams-questions.component.css']
})
export class ExamsQuestionsComponent implements OnInit {

  public orderQuestion = 0;
  public page = 1;
  public progressService = false;
  public questions = [];
  public question = null;
  public typeAnswer = null;
  public dismissible = false;
  public keyExam = null;
  public category = null;
  public saveOption = false;

  public isCollapsed = true;
  public settingLanguage = 'BOTH';
  public alphabeticalOrder = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  public modalReference: NgbModalRef;
  public disabledButtonNext;
  public disabledButtonLast;
  public isTraslate;

  isProgressBar = true;

  totalQuestions = 0;
  totalAnswersChecked = 0;
  totalNoAnswersChecked = 0;
  totalPorcertange = 0;
  numOption = 0;
  isEndExam: any = false;
  popupShowQuestions = [];
  countBookMarked = 0;

  constructor(
    private routers: Router,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private examProgressBarObservable: ExamProgressBarObservable,
    private examClearTimerObservable: ExamClearTimerObservable,
    private loginService: LoginService,
    private modalService: NgbModal,
    private isEndExamObservable: IsEndExamObservable
  ) { 
    const that = this;
    
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event) {
  //   const that = this;
  //   if (that.changes)
  //     {
  //       var message = "¿Estás seguro de que deseas abandonar el exámen?";
  //       if (confirm(message)) return true;
  //       else return false;
  //     }
  // }

  ngOnInit() {

    const that = this;
    that.cleanTimer();

    // localStorage.clear();
    this.timer();

    that.isEndExamObservable.currentIsEndExam.subscribe( res => {
      if(res) {
        that.isEndExam = res;
      }
    });

    this.route.params.subscribe(res => {
      if(res){
        that.keyExam = res.keyExam;
        that.getCategory(that.keyExam);
        that.saveOption = false;
        that.dismissible = false;
        that.orderQuestion = (Number(res.idQuestion) - 1);
        that.page = res.idQuestion;


        // if(!Number.isInteger(res.idQuestion)){
        //   // alert('No se encontró la pregunta');
        //   this.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/1');
        //   // return false;
        // }

        // if(that.page < 1) {
        //   // alert('No se encontró la pregunta');
        //   this.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/1');
        //   // return false;
        // }

        if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
          that.questions = JSON.parse(localStorage.getItem("questions"));

          that.questions.forEach((question, index) => { 
            that.questions[index]['data']['numQuestion'] = (index + 1);
          });

          that.question = that.questions[that.orderQuestion]['data'];

          that.settingLanguage = that.loginService.getAttrSession('settingLanguage');

        } else {
          that.routers.navigateByUrl('/exams');
        }
      }
    });

    that.examProgressBarObservable.currentMessage.subscribe( res => {
      if(res) {
       
       that.calculateProgressExam();
      } else {
        that.calculateProgressExam();
      }
    });

  }

  async getCategory(keyExam: string) {
    const that = this;
    that.progressService = true;
    if(typeof localStorage.getItem("category") !== 'undefined' && localStorage.getItem("category") != null){
      that.progressService = false;
      that.category = JSON.parse(localStorage.getItem("category"));
    } else {
      that.routers.navigateByUrl('/exams');
    }
    // await that.categoryService.getCategory(keyExam).then( res => {
    //   that.progressService = false;
    //   that.category = res;
    // });
  }


  loadPage(event: any) {
    const that = this;
    this.page = event;
    that.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/' + event);
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    document.getElementById("timer").innerHTML =  ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2); 
  }

  timer() {
    const that = this;
    let timeExam = 60; // Default
    let idsIntervals = [];

    that.cleanTimer();

    let x = window.setInterval(function() { 
      if(typeof localStorage.getItem("seconds") !== 'undefined' && localStorage.getItem("seconds") != null){
        timeExam = Number(localStorage.getItem('seconds'));
      } else {
        localStorage.setItem("seconds", timeExam.toString());
      }
      var currentTime = (timeExam - 1);
      localStorage.setItem("seconds", currentTime.toString());
      that.secondsToHms(currentTime);
      if (currentTime <= 0) { 
          localStorage.removeItem("seconds");
          window.clearInterval(x); 
          // document.getElementById("timer").innerHTML = "Tiempo cumplido";
          that.cleanTimer();
          that.examClearTimerObservable.changeMessage(true);
          localStorage.setItem('endExam', 'true');
          that.modalReference.close();
          localStorage.setItem("questions", JSON.stringify(that.questions));

          that.routers.navigateByUrl('/exams/'+ that.keyExam +'/score/ngb-panel-0-header');
      } else {
        // console.log(x);
      }
    }, 1000); 

    idsIntervals.push(x.toString());
    localStorage.setItem("intervalId", JSON.stringify(idsIntervals));
  }

  getTypeAnswer(type: string) {
    let typeInput = null;
    if(type === 'ONE_ANSWER'){
      typeInput = 'radio';
    } else if(type === 'TRUE_OR_FALSE'){
      typeInput = 'radio';
    } else if(type === 'MULTIPLE_ANSWER'){
      typeInput = 'checkbox';
    }
    return typeInput;
  }

  checkedOption(event: any, answers: any, question: any, order: any, position: number) {
    const that = this;
    that.saveOption = true;
    setTimeout( () => {
      that.saveOption = false;
      that.questions[order]['data']['answers'][position]['checked'] = event.target.checked;
      localStorage.setItem("questions", JSON.stringify(that.questions));
      // that.dismissible = true;
      that.examProgressBarObservable.changeMessage(true);
      // setTimeout(() => this.dismissible = false, 1000);
    }, 500);

  }

  cleanTimer() :void {
    window.clearInterval();
    if(typeof localStorage.getItem("intervalId") !== 'undefined' && localStorage.getItem("intervalId") != null){
      let getIntervalId: any[] = JSON.parse(localStorage.getItem("intervalId"));
      if(getIntervalId.length > 0)
        getIntervalId.forEach(id => {
          window.clearInterval(id);
        });
    }
  }

  endExam() {
    const that = this;
    
    let txt;
    let r = confirm("¿Estás seguro que deseas terminar la evaluación?");
    if (r == true) {
      that.progressService = true;
      setTimeout(() => {
        that.progressService = false;
        
        localStorage.removeItem("seconds");
        // document.getElementById("timer").innerHTML = "Tiempo cumplido";
        that.cleanTimer();
        that.examClearTimerObservable.changeMessage(true);
        localStorage.setItem('endExam', 'true');
        localStorage.setItem("questions", JSON.stringify(that.questions));
        that.isEndExamObservable.changeIsEndExam(false);
        that.routers.navigateByUrl('/exams/'+ that.keyExam +'/score/ngb-panel-0-header');
        
      }, 2000);

    } else {
      txt = "You pressed Cancel!";
    }

  }

  public validateCheckedUser(answer, typeAnswer) {
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.checked !== undefined){

        return ['far','square'];

      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      return ['far','circle'];

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      return ['far','circle'];

    }
  }
  // validateEndExam(questions: any) {
  //   const that = this;
  //   that.category.totalQuestions == ;
  //   that.questions.length
  // }


  showAllPopup(content) {

    const that = this;

    that.modalReference = that.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});

    let element = document.getElementById('ALL-QUESTIONS');
    element.dispatchEvent(new Event('click', { 'bubbles': true }));

    that.countBookMarked = that.questions.filter(f => f['data']['marked'] === true).length;

  }

  goQuestion(id: any) {
    const that = this;
    this.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/' + id);
    that.modalReference.close();
  }

  translate() {
    const that = this;
    if(that.isTraslate == true){
      that.isTraslate = false;
    } else {
      that.isTraslate = true;
    }
    
  }

  nextQuestion() {
    const that = this;

    that.disabledButtonNext = false;
    if(Number(that.page) != (that.questions.length)){
      that.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/' + (Number(that.page) + 1));
    } else {
      that.disabledButtonNext = true;
    }

    
  }

  lastQuestion() {
    const that = this;

    that.disabledButtonLast = false;
    if(Number(that.page) > 1){
      that.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/' + (Number(that.page) - 1));
    } else {
      that.disabledButtonLast = true;
    }

    
  }

  calculateProgressExam(): void {
    const that = this;
    that.totalAnswersChecked = 0;
    if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null) {
      let timeExam = Number(localStorage.getItem('seconds'));
      if(timeExam > 0){
        let questions: any[] = JSON.parse(localStorage.getItem("questions"));
        that.totalQuestions = (questions.length);
        questions.forEach(question => {
          that.numOption = 0;
          question.data.answers.forEach(element => {
            if(element.checked != null && element.checked == true){
              that.numOption = that.numOption + 1;
            }
          });
          if(that.numOption > 0){
            that.totalAnswersChecked = that.totalAnswersChecked + 1;
          }
        });

        // console.log((that.totalAnswersChecked / 100) * 100);

        that.totalPorcertange = Math.round((that.totalAnswersChecked / 100) * 100);
        that.totalNoAnswersChecked = (that.totalQuestions - that.totalAnswersChecked);
        that.isProgressBar = true;

      } else {
        that.isProgressBar = false;
      }

    } else {
      this.isProgressBar = false;
    }
  }


  addBookMarks(question: any, orderQuestion: number) {

    const that = this;
    that.saveOption = true;
    setTimeout( () => {
      that.saveOption = false;
      // console.log(that.questions[orderQuestion]);

      if(that.questions[orderQuestion]['data']['marked'] === true) {
        that.questions[orderQuestion]['data']['marked'] = false;
      } else {
        that.questions[orderQuestion]['data']['marked'] = true;
      }
      
      console.log(that.questions[orderQuestion]);
      //  = event.target.checked;
      localStorage.setItem("questions", JSON.stringify(that.questions));
      // // that.dismissible = true;
      // that.examProgressBarObservable.changeMessage(true);
      // setTimeout(() => this.dismissible = false, 1000);
    }, 500);

  }

  showQuestionsForType(type: string) {
    const that = this;

    let results: any = [];

    document.getElementById('ALL-QUESTIONS').classList.remove("activePopup");
    document.getElementById('BOOKMARKED').classList.remove("activePopup");

    if(type == 'ALL_QUESTIONS') {

      document.getElementById('ALL-QUESTIONS').classList.add("activePopup");

      results = that.questions;

      results.forEach(question => {

        let numOption = 0;

        question.data.answers.forEach(element => {
          if(element.checked != null && element.checked == true){
            numOption = numOption + 1;
          }
        });

        if(numOption > 0) {
          question.data['isAnswered'] = true;
        }

      });

    } else if(type == 'BOOKMARKED') {

      document.getElementById('BOOKMARKED').classList.add("activePopup");

      results = that.questions.filter(f => f['data']['marked'] === true);

    }

    console.log(results);

    that.popupShowQuestions = results;
    
  }


}
