import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsPostComponent } from './questions-post/questions-post.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionsComponent } from './questions.component';

@NgModule({
  declarations: [QuestionsComponent, QuestionsListComponent, QuestionsPostComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
