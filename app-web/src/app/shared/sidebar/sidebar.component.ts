import { Component, OnInit } from '@angular/core';
import { ExamProgressBarObservable } from 'src/app/core/observables/exam-progress-bar.observable';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public userData = null;

  isProgressBar = true;

  totalQuestions = 0;
  totalAnswersChecked = 0;
  totalNoAnswersChecked = 0;
  totalPorcertange = 0;
  numOption = 0;

  constructor(
    private examProgressBarObservable: ExamProgressBarObservable
  ) { }

  ngOnInit() {

    const that = this;

  //   var myPieChart = new Chart(document.getElementById('realtime'), {
  //     type: 'pie',
  //     data: {
  //       labels: ['Correctas', 'Incorrectas'],
  //       datasets: [{
  //         data: [12, 19],
  //         backgroundColor: [
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 99, 132, 1)'
  //         ],
  //         borderColor: [
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255,99,132,1)'
  //         ],
  //         borderWidth: 1
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
  //       // cutoutPercentage: 50 
  //    }
  // });

    that.examProgressBarObservable.currentMessage.subscribe( res => {
      if(res) {
       
       that.calculateProgressExam();
      } else {
        that.calculateProgressExam();
      }
    });


    if(
      typeof localStorage.getItem("user") !== 'undefined' && 
      localStorage.getItem("user") != null
    ){
      that.userData = JSON.parse(localStorage.getItem('user'));
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

        console.log((that.totalAnswersChecked / 100) * 100);

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


}
