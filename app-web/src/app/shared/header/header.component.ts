import { Component, OnInit, OnDestroy } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faUsers, faSignOutAlt, faUser, faHome, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { UserAuth } from '../../core/models/userAuth.model';
import { AuthObservable } from '../../auth.observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public data = null;
  public subscription: Subscription = null;
  public isLoggin: boolean;
  public userAuthAttr: UserAuth = null;

  constructor(
    private authService: AuthService,
    private authObservable: AuthObservable
  ) {
    library.add(faList, faUsers, faSignOutAlt, faUser, faHome, faUsers, faEdit);
  }

  ngOnInit() {
    const that = this;
    that.authService.StateAuth().subscribe( state => {
      if (state) {
        that.isLoggin = true;
        // that.authService.CurrentUserData(state.uid).subscribe(res => {
        //   if (res && res[0] && res[0].data) {
        //     const userNode: any = res[0].data;
        //     that.userAuthAttr = {
        //       uid: userNode.uid,
        //       email: userNode.email,
        //       displayName: userNode.displayName,
        //       photoURL: userNode.photoURL,
        //       emailVerified: userNode.emailVerified,
        //       role: userNode.role
        //     };
        //   }
        // });
      } else {
        that.isLoggin = false;
      }
    });
  }

  logout(event) {
    const that = this;
    event.preventDefault();
    that.authService.SignOut();
  }

}
