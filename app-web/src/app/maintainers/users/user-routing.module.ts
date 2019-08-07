import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersPostComponent } from './users-post/users-post.component';

const routes: Routes = [
 {
   path: 'users',
   component: UsersListComponent,
   children: [
     {
       path: 'post',
       component: UsersPostComponent
     }
   ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {

}
