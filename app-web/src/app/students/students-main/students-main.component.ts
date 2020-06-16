import { Component, OnInit } from '@angular/core';
import { faFileAlt, faChevronRight, faListUl, faClock, faPlay, faHistory, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-main',
  templateUrl: './students-main.component.html',
  styleUrls: ['./students-main.component.css']
})
export class StudentsMainComponent implements OnInit {

  constructor(
    private routers: Router
  ) { 
    library.add(faFileAlt, faChevronRight, faListUl, faClock, faPlay, faHistory, faArrowCircleLeft, faArrowCircleRight);
  }

  ngOnInit() {
  }

  getExamen(id: string) {
    this.routers.navigateByUrl('/students/23423423/exams/23423423/questions/1');
  }

}
