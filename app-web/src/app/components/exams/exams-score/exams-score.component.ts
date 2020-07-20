import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamClearTimerObservable } from 'src/app/core/observables/exam-clear-timer.observable';

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
  public alert = {
    type: '',
    message: ''
  } 


  constructor(config: NgbAccordionConfig,
    private routers: Router,
    private route: ActivatedRoute,
    private examClearTimerObservable: ExamClearTimerObservable
  ) 
    { 
    config.closeOthers = true;
    config.type = 'muted';

    const that = this;  

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
    

  }

  public validateOptionCorrect(answer, typeAnswer) {
    if(answer.checked !== undefined) {
      if(answer.checked === answer.isCorrect && answer.checked === true && answer.isCorrect === true) {
        return ['fas', 'check'];
      } else {
        return ['fas', 'times'];
      }
    } else if(answer.checked === undefined) {
      return ['fas', 'user'];
    }
  }

  public checkedIsNullOption(answer, typeAnswer) {
    if(answer.checked === undefined) {
        return true;
    } else if(answer.checked === null) { 
        return true;
    }
  }


  public validateCheckedUser(answer, typeAnswer) {
    
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','square'];
        } else  if(answer.checked === null) {
          return ['far','square'];
        }

      } else  if(answer.checked === undefined){
        return ['far','square'];
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','circle'];
        } else  if(answer.checked === null) {
          return ['far','circle'];
        }

      } else  if(answer.checked === undefined){
        return ['far','circle'];
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.checked !== undefined){

        if(answer.checked === true) {
          return ['fas','circle'];
        } else  if(answer.checked === null) {
          return ['far','circle'];
        }

      } else  if(answer.checked === undefined){
        return ['far','circle'];
      }

    }
    
  }

  public validateCheckedSystem(answer, typeAnswer) {
    if(typeAnswer === 'MULTIPLE_ANSWER') {
      
      if(answer.isCorrect === true){
        return ['fas','square'];
      } else if(answer.isCorrect === null){
        return ['far','square'];
      }

    } else if(typeAnswer === 'ONE_ANSWER') {

      if(answer.isCorrect === true){
        return ['fas','circle'];
      } else if(answer.isCorrect === null){
        return ['far','circle'];
      }

    } else if(typeAnswer === 'TRUE_OR_FALSE') {

      if(answer.isCorrect === true){
        return ['fas','circle'];
      } else if(answer.isCorrect === null){
        return ['far','circle'];
      }

    }
  }


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


    that.porcApproved = Math.round(((that.answerCheckedSuccess / this.getQuestions.length) * 100));

    if(that.porcApproved >= 80) {
      that.alert.type = 'success';
      that.alert.message = '¡Felicitaciones, aprobaste el examen!';
    } else {
      that.alert.type = 'warning';
      that.alert.message = 'No pudiste aprobar el examen';
    }

    var myPieChart = new Chart(document.getElementById('realtime'), {
        type: 'pie',
        data: {
          labels: ['Correctas', 'Incorrectas'],
          datasets: [{
            data: [that.answerCheckedSuccess, that.answerCheckedError],
            backgroundColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255,99,132,1)'
            ],
            borderWidth: 0
          }]
        },
        options: {
          title: {
            display: false,
            text: 'Resultado'
          },
          responsive: true,
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
      }
    });


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

}
