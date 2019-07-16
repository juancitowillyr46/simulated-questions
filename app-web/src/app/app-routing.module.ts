import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { QuestionsComponent } from "./maintainers/questions/questions.component";
import { QuestionsPostComponent } from "./maintainers/questions-post/questions-post.component";

const routes: Routes = [
  {
    path: "mantainers/questions",
    component: QuestionsComponent
  },
  {
    path: "mantainers/questions/form/:id",
    component: QuestionsPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
