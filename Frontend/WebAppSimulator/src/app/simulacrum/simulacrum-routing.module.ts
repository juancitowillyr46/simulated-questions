import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamsAvailableComponent } from './exams-available/exams-available.component';
import { ExamComponent } from './exam/exam.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { AuthGuard } from '../auth.guard';
import { SimulacrumComponent } from './simulacrum/simulacrum.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
 {
   path: 'simulacrum',
   component: DashboardComponent,
   canActivate: [AuthGuard],
   children: [
     {
       path: 'examsavailable',
       component: ExamsAvailableComponent
     },
     {
       path: 'exam',
       component: ExamComponent
     },
     {
       path: 'success-message',
       component: SuccessMessageComponent
     }
   ]
 }
];


@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
 })
export  class  SimulacrumRoutingModule {

}
