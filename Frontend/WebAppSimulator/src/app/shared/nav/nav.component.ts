import { Component, OnInit } from '@angular/core';
import { CategoryObservable } from 'src/app/core/observables/category.observable';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { IsEndExamObservable } from 'src/app/core/observables/is-end-exam.observable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public categoryData: any;
  public endExam: any = false;
  public urlImage: any = environment.URL_IMAGE;

  constructor(
    private categoryObservable: CategoryObservable,
    private isEndExamObservable: IsEndExamObservable
  ) { }

  ngOnInit() {
    const that = this;

    // that.categoryData = JSON.parse(localStorage.get('category'));
    that.categoryObservable.changeCategory(localStorage.getItem('category'));

    that.categoryObservable.currentCategory.subscribe( res => {
      if(res) {
        that.categoryData = JSON.parse(res);
      }
    });

    that.isEndExamObservable.currentIsEndExam.subscribe( res => {
      if(res){
        that.endExam = res;
      }
    });

  }

}
