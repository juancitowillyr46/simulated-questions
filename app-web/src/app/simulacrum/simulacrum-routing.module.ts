import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExamsAvailableComponent } from './exams-available/exams-available.component';
import { ExamComponent } from './exam/exam.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { SimulacrumComponent } from './simulacrum/simulacrum.component';

const routes: Routes = [
 {
   path: 'simulacrum',
   component: SimulacrumComponent,
   children: [
     {
       path: 'login',
       component: LoginComponent
     },
     {
       path: 'examenavailable',
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
