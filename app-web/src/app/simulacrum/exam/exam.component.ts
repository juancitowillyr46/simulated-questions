import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faClock,
  faListUl,
  faHome,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faSave,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public nextQuestion = false;
  constructor() {
    library.add(faPlay, faClock, faListUl, faHome, faArrowAltCircleLeft, faArrowAltCircleRight, faSave, faPaperPlane);
  }

  ngOnInit() {
  }

  public next() {
    this.nextQuestion = true;
  }

  public last() {
    this.nextQuestion = false;
  }

}
