import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './maintainers/questions/questions.component';
import { QuestionsPostComponent } from './maintainers/questions-post/questions-post.component';
import { LoginComponent } from './simulacrum/login/login.component';
import { ExamsAvailableComponent } from './simulacrum/exams-available/exams-available.component';
import { ExamComponent } from './simulacrum/exam/exam.component';
import { SuccessMessageComponent } from './simulacrum/success-message/success-message.component';

const routes: Routes = [
  {
    path: 'mantainers/questions',
    component: QuestionsComponent
  },
  {
    path: 'mantainers/questions/form/:id',
    component: QuestionsPostComponent
  },
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: 'simulacrum/login',
    component: LoginComponent
  },
  {
    path: 'simulacrum/examenavailable',
    component: ExamsAvailableComponent
  },
  {
    path: 'simulacrum/exam',
    component: ExamComponent
  },
  {
    path: 'simulacrum/success-message',
    component: SuccessMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
