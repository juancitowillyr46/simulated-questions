import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesPostComponent } from './categories-post/categories-post.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CategoriesListComponent, CategoriesPostComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
