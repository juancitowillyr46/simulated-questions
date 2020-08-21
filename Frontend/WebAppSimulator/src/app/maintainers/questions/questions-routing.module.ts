import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UsersListComponent } from './users-list/users-list.component';
// import { UsersPostComponent } from './users-post/users-post.component';
// import { UsersGuard } from './users.guard';
// import { QuestionsComponent } from './questions.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsPostComponent } from './questions-post/questions-post.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';

const routes: Routes = [
 {
  //  path: 'questions',
  //  component: DashboardComponent,
   // canActivate: [UsersGuard],
   children: [
    //  {
    //    path: 'post/:id',
    //    component: QuestionsPostComponent
    //  },
    //  {
    //   path: 'list',
    //   component: QuestionsListComponent
    //  },
    //  {
    //   path: 'mantainers/questions/form/:id',
    //   component: QuestionsPostComponent
    //  },
   ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuestionsRoutingModule {

}
