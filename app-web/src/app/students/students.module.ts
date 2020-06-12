import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students.routing.module';
import { StudentsMainComponent } from './students-main/students-main.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentsExamComponent } from './students-exam/students-exam.component';
import { NgbPaginationModule, NgbAlertModule, NgbProgressbarModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentsExamResultComponent } from './students-exam-result/students-exam-result.component';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faFileAlt, 
  faChevronRight, 
  faListUl, 
  faClock, 
  faPlay, 
  faHistory, 
  faChevronLeft, 
  faArrowCircleLeft, 
  faArrowCircleRight, 
  faSave, 
  faSpinner, 
  faCheck, 
  faCheckCircle,
  faPen, 
  faCheckSquare, 
  faSquare,
  faTimes,
  faUserEdit,
  faFileSignature,
  faLaptop,
 } from '@fortawesome/free-solid-svg-icons';

import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';


@NgModule({
  declarations: [
    StudentsMainComponent,
    StudentsExamComponent,
    StudentsExamResultComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FontAwesomeModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbProgressbarModule,
    NgbAccordionModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot(),
  ]
})
export class StudentsModule { 

  constructor() { 
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
      faSpinner,
      faCheck,
      faPen,
      faCheckCircle,
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faTimes,
      faUserEdit,
      faFileSignature,
      faLaptop
    );

  }

}
