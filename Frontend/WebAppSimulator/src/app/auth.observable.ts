import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class AuthObservable {

 private AuthUserAttr = new BehaviorSubject(null);
 public currentUserAttr = this.AuthUserAttr.asObservable();

 changeAuthUserAttr(value) {
  this.AuthUserAttr.next(value);
 }

}
