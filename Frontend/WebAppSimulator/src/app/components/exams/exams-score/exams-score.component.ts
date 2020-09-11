import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamClearTimerObservable } from 'src/app/core/observables/exam-clear-timer.observable';
import { IsEndExamObservable } from 'src/app/core/observables/is-end-exam.observable';

@Component({
  selector: 'app-exams-score',
  templateUrl: './exams-score.component.html',
  styleUrls: ['./exams-score.component.css']
})
export class ExamsScoreComponent implements OnInit {

  public getQuestions;
  public answerCheckedError = 0;
  public answerCheckedSuccess = 0;
  public porcApproved = 0;
  public porcApprovedTxt:any;
  public alert = {
    type: '',
    message: ''
  };
  
  public category = null;
  isEndExam: any = false;
  public alphabeticalOrder = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  public isTraslate;

  constructor(config: NgbAccordionConfig,
    private routers: Router,
    private route: ActivatedRoute,
    private examClearTimerObservable: ExamClearTimerObservable,
    private isEndExamObservable: IsEndExamObservable
  ) 
    { 
    config.closeOthers = true;
    config.type = 'muted';

    const that = this;  


    that.category = JSON.parse(localStorage.getItem("category"));

    if(typeof localStorage.getItem("questions") !== 'undefined' && localStorage.getItem("questions") != null){
      this.getQuestions = JSON.parse(localStorage.getItem("questions"));
    } else {
      that.routers.navigateByUrl('/exams');
    }

    
    if(typeof localStorage.getItem("endExam") !== 'undefined' && localStorage.getItem("endExam") != null){
      if(JSON.parse(localStorage.getItem('endExam')) != true){
        that.routers.navigateByUrl('/exams');
      }
    } else {
      that.routers.navigateByUrl('/exams');
    }

    this.route.params.subscribe(res => {
      if(res){
        let element = document.querySelector('#' + res.hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
          }, 200 );
        }
      }
    });

    that.isEndExamObservable.currentIsEndExam.subscribe( res => {
      if(res) {
        that.isEndExam = res;
      }
    });
    

  }


  public checkedIsNullOption(answer, typeAnswer) {
    if(answer.checked === undefined) {
        return true;
    } else if(answer.checked === null) { 
        return true;
    }
  }

  public validateOptionCorrect(answer, typeAnswer): number {
    if(answer.checked !== undefined) {
      if(answer.checked === true && answer.isCorrect === true) {
        return 1;
      } else if(answer.isCorrect !== true && answer.checked === true){
        return 2;
      } else if(answer.isCorrect === true && answer.checked !== true) {
        return 3;
      }
    } else if(answer.checked === undefined) {
      return 3;
    }
  }

  public validateCheckedUser(answer, typeAnswer): boolean {
    
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return true;
        } else  if(answer.checked === null) {
          return false;
        }

      } else  if(answer.checked === undefined){
        return false;
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return true;
        } else  if(answer.checked === null) {
          return false;
        }

      } else  if(answer.checked === undefined){
        return false;
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return true;
        } else  if(answer.checked === null) {
          return false;
        }

      } else  if(answer.checked === undefined){
        return false;
      }

    }
    
  }

  public validateCheckedSystem(answer, typeAnswer): boolean {
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.isCorrect === true){
        return true;
      } else if(answer.isCorrect === null){
        return false;
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.isCorrect === true){
        return true
      } else if(answer.isCorrect === null){
        return false;
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.isCorrect === true){
        return true;
      } else if(answer.isCorrect === null){
        return false;
      }

    }
  }

  // public validate(answer, typeAnswer): number {

  //   if(typeAnswer === 'MULTIPLE_ANSWER') {
      
  //     if(answer.checked !== undefined){

  //       if(answer.checked === true) {
  //         return true;
  //       } else  if(answer.checked === null) {
  //         return false;
  //       }

  //     } else  if(answer.checked === undefined){
  //       return false;
  //     }

  //   } else if(typeAnswer === 'ONE_ANSWER') {

  //     if(answer.checked !== undefined){

  //       if(answer.checked === true) {
  //         return true;
  //       } else  if(answer.checked === null) {
  //         return false;
  //       }

  //     } else  if(answer.checked === undefined){
  //       return false;
  //     }

  //   } else if(typeAnswer === 'TRUE_OR_FALSE') {

  //     if(answer.checked !== undefined){

  //       if(answer.checked === true) {
  //         return true;
  //       } else  if(answer.checked === null) {
  //         return false;
  //       }

  //     } else  if(answer.checked === undefined){
  //       return false;
  //     }

  //   }

  // }



  ngOnInit() {

    const that = this;
    
    this.getQuestions.forEach(question => {

      let incorrect = 0;
      let correct   = 0;

      if(question.data) {          

        if(question.data.answers) {

          // Preguntas correctas
          let correctSystem = question.data.answers.filter(f => f.isCorrect === true);

          // Correctas
          let findAnswersTrue = question.data.answers.filter(f => f.isCorrect === true && f.checked === true);

          // Incorrectas
          let findAnswersFalse = question.data.answers.filter(f => f.isCorrect !== true && f.checked !== true);

          if(correctSystem.length === findAnswersTrue.length){
            correct += 1;
          } else {
            incorrect += 1;
          }

          if(correct > 0) {
            this.answerCheckedSuccess = this.answerCheckedSuccess + 1;
            question.data['checkedIcon'] = '';
          }
          
          if(incorrect > 0) {
            this.answerCheckedError = this.answerCheckedError + 1;
            question.data['checkedIcon'] = 'exclamation';
          }

        }
      }
    });

    
    const totalQuestions = (that.getQuestions.length);
    const correctsQuestions =  that.answerCheckedSuccess;
    const incorrectQuestions = that.answerCheckedError;


    that.porcApproved = ((correctsQuestions * 100) / totalQuestions);  //Math.round(((that.answerCheckedSuccess * 100) / 80));
    //console.log(that.porcApproved);
    that.porcApprovedTxt = that.porcApproved.toFixed(1).toString();
    const approvalPercentage = (that.category.approvalPercentage)? that.category.approvalPercentage : 80;

    if(that.porcApproved >= approvalPercentage) {
      that.alert.type = 'success';
      that.alert.message = '¡Felicitaciones!, aprobaste el exámen';
    } else {
      that.alert.type = 'warning';
      that.alert.message = 'No pudiste aprobar el exámen';
    }

    // var myPieChart = new Chart(document.getElementById('realtime'), {
    //     type: 'pie',
    //     data: {
    //       labels: ['Correctas', 'Incorrectas'],
    //       datasets: [{
    //         data: [that.answerCheckedSuccess, that.answerCheckedError],
    //         backgroundColor: [
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 99, 132, 1)'
    //         ],
    //         borderColor: [
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255,99,132,1)'
    //         ],
    //         borderWidth: 0
    //       }]
    //     },
    //     options: {
    //       title: {
    //         display: false,
    //         text: 'Resultado'
    //       },
    //       responsive: true,
    //       layout: {
    //         padding: {
    //             left: 0,
    //             right: 0,
    //             top: 0,
    //             bottom: 0
    //         }
    //     }
    //   }
    // });


  }

  public beforeChange($event: NgbPanelChangeEvent) {
    // console.log($event);
    // var my_element = document.getElementById($event.panelId.toString() + '-header');
    // my_element.scrollIntoView({
    //   behavior: "smooth",
    //   // block: "start",
    //   // inline: "nearest"
    // });
    this.routers.navigateByUrl('/exams/SCRUM_MASTER/score/' + $event.panelId.toString() + '-header' );

    // this.routers.navigateByUrl('/exams/SCRUM_MASTER/score/' + $event.panelId.toString() + '-header' );
    // if ($event.panelId === 'preventchange-2') {
    //   $event.preventDefault();
    // }

    // if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
    //   $event.preventDefault();
    // }
  }

  public irExamenes() {
    const that = this;
    localStorage.removeItem("endExam");
    localStorage.removeItem("questions");
    localStorage.removeItem("category");
    localStorage.removeItem("keyExam");
    localStorage.removeItem("intervalId");
    
    that.routers.navigateByUrl('/exams');
  }

  translate() {
    const that = this;
    if(that.isTraslate == true){
      that.isTraslate = false;
    } else {
      that.isTraslate = true;
    }
    
  }

}
