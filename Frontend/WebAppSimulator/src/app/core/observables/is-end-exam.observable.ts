import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class IsEndExamObservable {

 private isEndExamData = new BehaviorSubject(null);
 public currentIsEndExam = this.isEndExamData.asObservable();

 changeIsEndExam(value) {
  this.isEndExamData.next(value);
 }

}
