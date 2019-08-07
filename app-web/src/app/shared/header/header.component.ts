import { Component, OnInit } from '@angular/core';
import { SharedObservable } from '../../observables/shared.observable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public sharedHeader: boolean;

  constructor(private sharedObservable: SharedObservable) {
    library.add(faList, faUsers);
  }

  ngOnInit() {
    this.sharedHeader = false;
    this.sharedObservable.currentUser.subscribe( res => {
      console.log(res);
      this.sharedHeader = res;
    });
  }

}
