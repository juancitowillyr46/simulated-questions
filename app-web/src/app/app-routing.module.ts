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
import { ExamsEnabledComponent } from './components/exams/exams-enabled/exams-enabled.component';
import { ExamsQuestionsComponent } from './components/exams/exams-questions/exams-questions.component';
import { ExamsScoreComponent } from './components/exams/exams-score/exams-score.component';
import { QuestionsIndexComponent } from './maintainers/questions/questions-index/questions-index.component';
import { QuestionsPostComponent } from './maintainers/questions/questions-post/questions-post.component';
import { QuestionsListComponent } from './maintainers/questions/questions-list/questions-list.component';

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
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  
  /* Cliente  */
  {
    path: 'exams',
    component: ExamsEnabledComponent,
  },
  {
    path: 'exams/:keyExam/questions/:idQuestion',
    component: ExamsQuestionsComponent,
  },
  {
    path: 'exams/:keyExam/score/:hash',
    component: ExamsScoreComponent,
  },


  /* Manager Questions */
  {
    path: 'manager/questions',
    component: QuestionsIndexComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuestionsListComponent
      },
      {
        path: ':id',
        component: QuestionsPostComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
