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

    // let progressBar = require('progressbar.js');
    // progressBar.
    
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

}
