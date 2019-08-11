import { Injectable } from '@angular/core';
import { SharedObservable } from '../observables/shared.observable';
import { Router } from '@angular/router';

@Injectable()

export class LogoutUser {

  constructor(
   private router: Router,
   private sharedObservable: SharedObservable
  ) {

  }

  clearSession() {
   const that = this;
   sessionStorage.removeItem('token');
   that.sharedObservable.changeHeaderUser(null);
   this.router.navigate(['/simulacrum/login']);
  }

}
