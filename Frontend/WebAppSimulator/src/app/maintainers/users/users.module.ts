import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersPostComponent } from './users-post/users-post.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { UsersIndexComponent } from './users-index/users-index.component';

@NgModule({
  declarations: [], // UsersPostComponent, UsersListComponent, UsersIndexComponent
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
