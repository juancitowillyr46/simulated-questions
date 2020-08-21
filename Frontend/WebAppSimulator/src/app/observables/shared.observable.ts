import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class SharedObservable {

 private headerUser = new BehaviorSubject(null);
 public currentUser = this.headerUser.asObservable();

 changeHeaderUser(value) {
  this.headerUser.next(value);
 }


}
