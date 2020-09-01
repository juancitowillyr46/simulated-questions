import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class IsFooterObsevable {

  private isFooterData = new BehaviorSubject<boolean>(null);
  public currentIsFooterData = this.isFooterData.asObservable();

  constructor() {
  }

  changeIsFooter(val) {
    this.isFooterData.next(val);
  }

}
