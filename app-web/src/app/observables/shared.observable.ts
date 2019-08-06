import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class SharedObservable {
 private header = new BehaviorSubject(true);
 public currentUser = this.header.asObservable();

 changeHeader(value) {
  this.header.next(value);
 }


}
