import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPostComponent } from './users-post/users-post.component';
import { UsersGuard } from './users.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';

const routes: Routes = [
 {
  //  path: 'users',
  //  component: DashboardComponent,
  //  canActivate: [UsersGuard],
   children: [
    // {
    //   path: 'list',
    //   component: UsersListComponent
    // },
    // {
    //   path: 'post/:id',
    //   component: UsersPostComponent
    // }
   ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {

}
