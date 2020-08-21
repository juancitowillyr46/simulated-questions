import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { UsersGuard } from './users.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesPostComponent } from './categories-post/categories-post.component';

const routes: Routes = [
 {
   path: 'categories',
   component: DashboardComponent,
   // canActivate: [UsersGuard],
   children: [
     {
       path: 'list',
       component: CategoriesListComponent
     },
     {
       path: 'post/:id',
       component: CategoriesPostComponent
     }
   ]
 }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {

}
