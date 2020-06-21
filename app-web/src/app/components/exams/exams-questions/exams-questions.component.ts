import { Component, OnInit, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/maintainers/questions/questions.service';
import { CategoriesService } from 'src/app/maintainers/categories/categories.service';
import { ExamProgressBarObservable } from 'src/app/core/observables/exam-progress-bar.observable';

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

  constructor(
    private routers: Router,
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private examProgressBarObservable: ExamProgressBarObservable
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

    this.route.params.subscribe(res => {
      if(res){
        that.keyExam = res.keyExam;
        that.getCategory(that.keyExam);
        that.saveOption = false;
        that.dismissible = false;
        that.orderQuestion = (Number(res.idQuestion) - 1);
        that.page = res.idQuestion;
        if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
          that.questions = JSON.parse(localStorage.getItem("questions"));
          that.question = that.questions[that.orderQuestion]['data'];
          that.question.answers.forEach(answer => {
            if(answer['checked'] === null){
              answer['checked'] = null;
            }
          });
        } else {
          that.routers.navigateByUrl('/exams');
        }
      }
    });

  }

  async getCategory(keyExam: string) {
    const that = this;
    that.progressService = true;
    await that.categoryService.getCategory(keyExam).then( res => {
      that.progressService = false;
      that.category = res;
    });
  }


  goQuestion(event: any) {
    const that = this;
    this.page = event.target.value;
    this.routers.navigateByUrl('/exams/'+ that.keyExam +'/questions/' + event.target.value);
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
    document.getElementById("timer").innerHTML =  ("0" + h).slice(-2) + " : " + ("0" + m).slice(-2) + " : " + ("0" + s).slice(-2); 
  }

  timer() {
    const that = this;
    let timeExam = 7200; // Default
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
          document.getElementById("timer").innerHTML = "Tiempo cumplido";
          that.cleanTimer();
          that.routers.navigateByUrl('/exams/'+ that.keyExam +'/score');
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
      that.dismissible = true;
      that.examProgressBarObservable.changeMessage(true);
      setTimeout(() => this.dismissible = false, 2000);
    }, 2000 );

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

}
