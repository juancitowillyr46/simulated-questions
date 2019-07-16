import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { QuestionsComponent } from "./maintainers/questions/questions.component";
import { QuestionsPostComponent } from "./maintainers/questions-post/questions-post.component";

@NgModule({
  declarations: [AppComponent, QuestionsComponent, QuestionsPostComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
