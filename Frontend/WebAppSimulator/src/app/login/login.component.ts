import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

// import { User } from '../../core/models/user.model';
import { AuthService } from '../auth.service';
import { LoginObservable } from './login.observable';
import { UsersService } from '../maintainers/users/users.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup = null;
  public submit: boolean;
  public error: boolean;
  public loginMessage: any = null;
  public inProgressLogin: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private usersService: UsersService,
      private loginObservable: LoginObservable,
      private loginService: LoginService,
      public router: Router
  ) {
    
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  get f() { return this.formGroup.controls; }

  public async login() {
    const that = this;

    if (that.formGroup.invalid === true) {
      that.submit = true;
      return false;
    }

    that.error = false;

    const username = that.formGroup.value.username;
    const password =  that.formGroup.value.password;

    that.inProgressLogin = true;
    await that.authService.signIn(username, password).then(siginRes => {
      console.log(siginRes);
      if(siginRes) {
        that.usersService.getUserByUid(siginRes.user.uid).then( userRes => {
          console.log(userRes);
          const success = that.loginService.addSession(userRes);
          if(success) {
            const role = that.loginService.getAttrSession('role');
            console.log(role);
            that.inProgressLogin = false;
            if(role === 'USER_ADMIN'){
              that.router.navigate(['/manager/questions']);
            } else {
              that.router.navigate(['/exams']);
            }
          }
        });
      }
    }).catch(error => {
      that.inProgressLogin = false;
      that.loginMessage = error;
    });
  }

}
