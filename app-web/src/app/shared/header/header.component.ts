import { Component, OnInit } from '@angular/core';
import { SharedObservable } from '../../observables/shared.observable';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faUsers, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../simulacrum/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public data = null;
  public subscription: Subscription = null;

  constructor(
    private loginService: LoginService,
    private sharedObservable: SharedObservable,
    private router: Router
  ) {
    library.add(faList, faUsers, faSignOutAlt, faUser);
  }

  ngOnInit() {
    const that = this;
    that.data = null;
    that.subscription = that.sharedObservable.currentUser.subscribe( res => {
      if (res) {
        that.data = res.data;
        console.log(that.data);
      } else {
        that.data = null;
      }
    });
  }

  public logout(event) {
    const that = this;
    event.preventDefault();
    sessionStorage.removeItem('token');
    that.sharedObservable.changeHeaderUser(null);
    that.data = null;
    this.router.navigate(['/simulacrum/login']);
  }

}
