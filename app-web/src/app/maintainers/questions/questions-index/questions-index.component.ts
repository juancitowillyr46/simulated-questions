import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-index',
  templateUrl: './questions-index.component.html',
  styleUrls: ['./questions-index.component.css']
})
export class QuestionsIndexComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.router.navigate(['/all']);
  }

}
