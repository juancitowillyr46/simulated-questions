import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { QuestionsComponent } from './maintainers/questions/questions.component';
// import { QuestionsPostComponent } from './maintainers/questions/questions-post/questions-post.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsService } from './maintainers/questions/questions.service';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedObservable } from './observables/shared.observable';
import { SimulacrumModule } from './simulacrum/simulacrum.module';
import { UsersModule } from './maintainers/users/users.module';
import { GeneratePassword } from './commons/generatePassword';
import { LoginService } from './login/login.service';
import { LogoutUser } from './commons/logoutUser';
import { ExamObservable } from './simulacrum/exam/exam.observable';
import { SuccessMessageObservable } from './simulacrum/success-message/sucess-message.observable';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginObservable } from './login/login.observable';
import { UsersGuard } from './maintainers/users/users.guard';
import { AuthObservable } from './auth.observable';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';
import { QuestionsModule } from './maintainers/questions/questions.module';
import { CategoriesComponent } from './maintainers/categories/categories.component';
import { CategoriesModule } from './maintainers/categories/categories.module';
import { SignupComponent } from './signup/signup.component';
import { SignUpObservable } from './signup/signup.observable';
import { MessageObservable } from './observables/message.observable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faFileAlt, 
  faChevronRight, 
  faListUl, 
  faClock, 
  faPlay, 
  faHistory, 
  faChevronLeft, 
  faArrowCircleLeft, 
  faArrowCircleRight, 
  faSave, 
  faSpinner, 
  faCheck, 
  faCheckCircle,
  faPen, 
  faCheckSquare, 
  faSquare,
  faTimes,
  faUserEdit,
  faFileSignature,
  faLaptop,
  faStopwatch
 } from '@fortawesome/free-solid-svg-icons';

import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';


import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { ExamsScoreComponent } from './components/exams/exams-score/exams-score.component';
import { ExamsQuestionsComponent } from './components/exams/exams-questions/exams-questions.component';
import { ExamsEnabledComponent } from './components/exams/exams-enabled/exams-enabled.component';
import { NavComponent } from './shared/nav/nav.component';
import { NgbPaginationModule, NgbAlertModule, NgbProgressbarModule, NgbAccordionModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,

    /* Shared */
    SidebarComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    
    NotFoundComponent,
    DashboardComponent,
    MenuComponent,
    CategoriesComponent,
    SignupComponent,

    /* Exams */
    ExamsEnabledComponent,
    ExamsScoreComponent,
    ExamsQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,

    HttpClientModule,
    FontAwesomeModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbProgressbarModule,
    NgbAccordionModule,
    NgCircleProgressModule.forRoot(),
    NgbModalModule,
    
    CategoriesModule,
    QuestionsModule,
    SimulacrumModule,
    UsersModule,

  ],
  providers: [
    QuestionsService,
    SharedObservable,
    GeneratePassword,
    LoginService,
    LogoutUser,
    ExamObservable,
    SuccessMessageObservable,
    LoginObservable,
    AuthObservable,
    SignUpObservable,
    MessageObservable,

    AuthService,
    AuthGuard,
    UsersGuard
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

  constructor() { 
    library.add(
      faFileAlt, 
      faChevronRight, 
      faListUl, 
      faClock, 
      faPlay, 
      faHistory, 
      faChevronLeft, 
      faChevronRight, 
      faArrowCircleLeft, 
      faArrowCircleRight,
      faSave,
      faSpinner,
      faCheck,
      faPen,
      faCheckCircle,
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faTimes,
      faUserEdit,
      faFileSignature,
      faLaptop,
      faStopwatch
    );

  }

}
