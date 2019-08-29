import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MessageObservable } from '../../../observables/message.observable';
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

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private messageObservable: MessageObservable
  ) {
    library.add(faTimes, faPlus, faInfoCircle, faCheckCircle, faCheck, faPen, faTrash, faArrowCircleLeft);
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

}
