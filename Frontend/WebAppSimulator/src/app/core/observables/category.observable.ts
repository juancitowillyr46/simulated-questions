import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class CategoryObservable {

 private categoryData = new BehaviorSubject(null);
 public currentCategory = this.categoryData.asObservable();

 changeCategory(value) {
  this.categoryData.next(value);
 }

}
