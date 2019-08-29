import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faAppleAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '../core/models/userAuth.model';
import { SignUpObservable } from './signup.observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public formGroup: FormGroup = null;
  public submit: boolean;
  public error: boolean;
  public message: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private signUpObservable: SignUpObservable
  ) {
    library.add(faLock, faUser, faAppleAlt, faAt);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    that.signUpObservable.currentMessage.subscribe(res => {
      if (res !== null) {
        that.message = res;
      }
    });

  }

  get f() { return this.formGroup.controls; }

  public signUp() {

    const that = this;

    if (that.formGroup.invalid === true) {
      that.submit = true;
      return false;
    }

    that.error = false;

    const userAuth: UserAuth = {
      displayName: that.formGroup.value.displayName,
      password: that.formGroup.value.password,
      email: that.formGroup.value.email,
      active: true,
      createdAt: new Date(),
      emailVerified: true,
      photoURL: '',
      role: 'USER_STUDENT',
      uid: '',
      assignedTests: []
    };

    that.authService.SignUp(userAuth);
  }

}
