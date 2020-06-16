import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faFileAlt, faChevronRight, faListUl, faClock, faPlay, faHistory, faChevronLeft, faArrowCircleLeft, faArrowCircleRight, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-students-exam',
  templateUrl: './students-exam.component.html',
  styleUrls: ['./students-exam.component.css']
})
export class StudentsExamComponent implements OnInit {

  public idQuestion;
  public page = 1;
  public serviceProgress = false;

  constructor(
    private routers: Router,
    private route: ActivatedRoute
  ) { 
    library.add(
      faFileAlt, 
      faChevronRight, 
      faListUl, 
      faClock, 
      faPlay, 
      faHistory, 
      faChevronLeft, 
      faChevronRight, 
      faArrowCircleLeft, 
      faArrowCircleRight,
      faSave,
      faSpinner
    );
  }

  ngOnInit() {

    // localStorage.clear();
    this.timer();
    
    this.route.params.subscribe(res => {
      if(res){
        this.idQuestion = Number(res.idQuestion);
      }
    });
  }

  goQuestion(event: any) {
    // console.log(event.target.value);
    // let value = 
    this.page = event.target.value;
    this.routers.navigateByUrl('/students/23423423/exams/23423423/questions/' + event.target.value);
  }

  loadPage(event: any) {
    // console.log(event);
    this.routers.navigateByUrl('/students/23423423/exams/23423423/questions/' + event);
  }

  saveQuestion(event: any) {
    this.serviceProgress = true;
    setTimeout(() => {
      this.serviceProgress = false;
    }, 5000);
  }

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    document.getElementById("demo").innerHTML =  ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2); 
    console.log(("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2));
  }

  timer() {

    const that = this;

    let timeExam = 60;

    var x = window.setInterval(function() { 

      if(typeof localStorage.getItem("seconds") !== 'undefined' && localStorage.getItem("seconds") != null){
        timeExam = Number(localStorage.getItem('seconds'));
      } else {
        localStorage.setItem("seconds", timeExam.toString());
      }

      var currentTime = (timeExam - 1);
      localStorage.setItem("seconds", currentTime.toString());

      that.secondsToHms(currentTime);

      if (currentTime <= 0) { 
          window.clearInterval(x); 
          document.getElementById("demo").innerHTML = "EXPIRED"; 
      }

    }, 1000); 

  }

}
