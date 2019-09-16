import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageObservable } from '../../../observables/message.observable';
import { CategoriesService } from '../../categories/categories.service';
import {
  faTimes,
  faPlus,
  faInfoCircle,
  faCheckCircle,
  faCheck,
  faPen,
  faTrash,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users = [];
  public message: any = null;
  public categories: any[] = [];

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private messageObservable: MessageObservable,
    private categoriesService: CategoriesService,
  ) {

    const that = this;
    library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft);
    that.categoriesService.list().subscribe(res => {
      const categories: any = res;
      that.categories = [];
      for (let key$ in categories) {
        const category: any = res[key$];
        category.key = key$;
        category.selected = false;
        that.categories.push(categories[key$]);
      };
    });

  }

  ngOnInit() {
    const that = this;

    this.usersService.list().subscribe( res => {
      const users: any = res;
      that.users = [];
      for (let key$ in users) {
        const user: any = res[key$];
        user.key = key$;
        that.users.push(users[key$]);
      };
    });

    that.messageObservable.currentMessage.subscribe(res => {
      if (res) {
        that.message = res;
      }
    });
  }

  public categoriesFind(assignedTests: any[]) {
    const that = this;
    if (assignedTests && assignedTests.length > 0) {
      const cat: any[] = [];
      assignedTests.forEach(at => {
        if (that.categories.find( c => c.key === at.key)) {
          cat.push(that.categories.find( c => c.key === at.key).name);
        }
      });
      return cat.join(', ');
    } else {
      return 'ninguno';
    }

  }

}
