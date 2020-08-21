import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedObservable } from './observables/shared.observable';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app-web';
  public subscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sharedObservable: SharedObservable
  ) {
    const that = this;
    // that.loginService.getUser().subscribe(res => {
    //   console.log(res);
    //   that.sharedObservable.changeHeaderUser(res);
    // });
  }

  ngOnInit(): void {
    const that = this;
    that.subscription = that.sharedObservable.currentUser.subscribe( res => {
      if (res === null) {
        // this.router.navigate(['/simulacrum/login']);
      }
    });



  }

  ngOnDestroy(): void {
    const that = this;
    that.subscription.unsubscribe();
  }
}
