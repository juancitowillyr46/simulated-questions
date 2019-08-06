import { Component, OnInit } from '@angular/core';
import { SharedObservable } from './observables/shared.observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-web';


  constructor(private sharedObservable: SharedObservable) {

  }

  ngOnInit(): void {

  }
}
