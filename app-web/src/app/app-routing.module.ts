import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
// import { QuestionsComponent } from './maintainers/questions/questions.component';
// import { QuestionsPostComponent } from './maintainers/questions/questions-post/questions-post.component';
import { LoginComponent } from './login/login.component';
// import { ExamsAvailableComponent } from './simulacrum/exams-available/exams-available.component';
// import { ExamComponent } from './simulacrum/exam/exam.component';
// import { SuccessMessageComponent } from './simulacrum/success-message/success-message.component';
// import { SimulacrumRoutingModule } from './simulacrum/simulacrum-routing.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  // {
  //   path: 'mantainers/questions',
  //   component: QuestionsComponent
  // },
  // {
  //   path: 'mantainers/questions/form/:id',
  //   component: QuestionsPostComponent
  // },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   component: QuestionsComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  // },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  // {
  //   path: 'simulacrum/login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'simulacrum/examenavailable',
  //   component: ExamsAvailableComponent
  // },
  // {
  //   path: 'simulacrum/exam',
  //   component: ExamComponent
  // },
  // {
  //   path: 'simulacrum/success-message',
  //   component: SuccessMessageComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
