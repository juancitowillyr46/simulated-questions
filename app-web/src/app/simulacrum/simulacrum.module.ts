import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { ExamsAvailableComponent } from '../simulacrum/exams-available/exams-available.component';
import { ExamComponent } from './exam/exam.component';
import { SuccessMessageComponent } from '../simulacrum/success-message/success-message.component';
import { SimulacrumRoutingModule } from './simulacrum-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SimulacrumComponent } from './simulacrum/simulacrum.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HeaderComponent } from '../shared/header/header.component';
// import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [LoginComponent,
    ExamsAvailableComponent,
    ExamComponent,
    SuccessMessageComponent,
    SimulacrumComponent,
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    SimulacrumRoutingModule
  ]
})
export class SimulacrumModule { }
