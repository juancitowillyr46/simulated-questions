import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './maintainers/questions/questions.component';
import { QuestionsPostComponent } from './maintainers/questions-post/questions-post.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsService } from './maintainers/questions.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnswersComponent } from './maintainers/answers/answers.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedObservable } from './observables/shared.observable';
import { SimulacrumModule } from './simulacrum/simulacrum.module';
import { UsersModule } from './maintainers/users/users.module';
import { GeneratePassword } from './commons/generatePassword';

/**
 * Custom angular notifier options
 */


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionsPostComponent,
    AnswersComponent,
    HeaderComponent,
    FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimulacrumModule,
    UsersModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [QuestionsService, SharedObservable, GeneratePassword],
  bootstrap: [AppComponent]
})
export class AppModule {}
