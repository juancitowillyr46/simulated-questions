import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { AnswersComponent } from './maintainers/answers/answers.component';
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
import { DashboardModule } from './dashboard/dashboard.module';
import { MenuComponent } from './shared/menu/menu.component';
import { QuestionsModule } from './maintainers/questions/questions.module';
import { CategoriesComponent } from './maintainers/categories/categories.component';
import { CategoriesModule } from './maintainers/categories/categories.module';
import { SignupComponent } from './signup/signup.component';
import { SignUpObservable } from './signup/signup.observable';
import { MessageObservable } from './observables/message.observable';

/**
 * Custom angular notifier options
 */


@NgModule({
  declarations: [
    AppComponent,
    // QuestionsComponent,
    // QuestionsPostComponent,
    // AnswersComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    DashboardComponent,
    MenuComponent,
    CategoriesComponent,
    SignupComponent],
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

    // DashboardModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {}
