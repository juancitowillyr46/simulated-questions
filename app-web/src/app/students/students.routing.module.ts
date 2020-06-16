import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsMainComponent } from './students-main/students-main.component';
import { StudentsExamComponent } from './students-exam/students-exam.component';
import { StudentsExamResultComponent } from './students-exam-result/students-exam-result.component';

const routes: Routes = [
  {
    path: 'students/:id',
    component: StudentsMainComponent
  },
  {
    path: 'students/:id/exams/:idExam/questions/:idQuestion',
    component: StudentsExamComponent
  },
  {
    path: 'students/:id/exams/:idExam/result',
    component: StudentsExamResultComponent
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StudentsRoutingModule {

}
