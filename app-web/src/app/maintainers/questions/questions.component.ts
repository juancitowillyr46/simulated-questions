import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  constructor(private routeActive: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  public form(id: number, event) {
    event.preventDefault();
    this.router.navigate(["/mantainers/questions/form/", id]);
  }
}
