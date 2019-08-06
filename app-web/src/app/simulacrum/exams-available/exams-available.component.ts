import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exams-available',
  templateUrl: './exams-available.component.html',
  styleUrls: ['./exams-available.component.css']
})
export class ExamsAvailableComponent implements OnInit {

  constructor() {
    library.add(faPlay, faClock, faListUl, faArrowCircleLeft, faSave, faSignOutAlt);
  }

  ngOnInit() {
  }

}
