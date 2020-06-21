import { Component, OnInit } from '@angular/core';
import { ExamProgressBarObservable } from 'src/app/core/observables/exam-progress-bar.observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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

    that.examProgressBarObservable.currentMessage.subscribe( res => {
      if(res) {
       
       that.calculateProgressExam();
      } else {
        that.calculateProgressExam();
      }
    });



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
