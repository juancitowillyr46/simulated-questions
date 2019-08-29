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

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private loginObservable: LoginObservable
  ) {
    library.add(faLock, faUser, faAppleAlt);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    that.loginObservable.currentMessage.subscribe(res => {
      if (res !== null) {
        that.loginMessage = res;
      }
    });

  }


  get f() { return this.formGroup.controls; }

  public login() {
    const that = this;

    if (that.formGroup.invalid === true) {
      that.submit = true;
      return false;
    }

    that.error = false;

    const username = that.formGroup.value.username;
    const password =  that.formGroup.value.password;
    that.authService.SignIn(username, password);
  }

}
