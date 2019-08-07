import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../simulacrum/login/login.component';
import { ExamsAvailableComponent } from '../simulacrum/exams-available/exams-available.component';
import { ExamComponent } from './exam/exam.component';
import { SuccessMessageComponent } from '../simulacrum/success-message/success-message.component';
import { SimulacrumRoutingModule } from './simulacrum-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimulacrumComponent } from './simulacrum/simulacrum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ExamsAvailableComponent, ExamComponent, SuccessMessageComponent, SimulacrumComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    SimulacrumRoutingModule
  ]
})
export class SimulacrumModule { }
