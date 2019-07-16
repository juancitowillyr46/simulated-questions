import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-questions-post",
  templateUrl: "./questions-post.component.html",
  styleUrls: ["./questions-post.component.css"]
})
export class QuestionsPostComponent implements OnInit {
  public type;
  public formGroup: FormGroup;
  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const that = this;
    if (
      that.routeActive.snapshot.paramMap.get("id") === undefined &&
      that.routeActive.snapshot.paramMap.get("id") == null
    ) {
      that.router.navigateByUrl("/mantainers/questions");
    }

    that.formGroup = this.formBuilder.group({
      question: ["", [Validators.required]],
      type: ["", [Validators.required]],
      file: ["", [Validators.required]],
      options: ["", [Validators.required]],
      answer: ["", [Validators.required]]
    });
  }

  public ir(event) {
    const that = this;
    event.preventDefault();
    that.router.navigate(["/mantainers/questions/"]);
  }

  public seleccion(event) {
    const that = this;
    console.log(event.target.value);
    that.type = event.target.value;
  }

  public save(event) {
    const that = this;
    console.log(that.formGroup);
    that.router.navigateByUrl("/mantainers/questions");
  }
}
