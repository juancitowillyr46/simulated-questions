import { Component, OnInit, OnDestroy } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { SharedObservable } from '../../observables/shared.observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private sharedObservable: SharedObservable) {
    library.add(faLock, faUser, faAppleAlt);
  }

  ngOnInit() {
    this.sharedObservable.changeHeader(false);
  }

  ngOnDestroy(): void {
    this.sharedObservable.changeHeader(true);
  }

}
