import { Component, OnInit } from '@angular/core';
import { SharedObservable } from '../../observables/shared.observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public sharedHeader: boolean;

  constructor(private sharedObservable: SharedObservable) { }

  ngOnInit() {
    this.sharedHeader = false;
    this.sharedObservable.currentUser.subscribe( res => {
      console.log(res);
      this.sharedHeader = res;
    });
  }

}
