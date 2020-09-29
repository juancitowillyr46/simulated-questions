import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faAppleAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import { UserAuth, CreateUser } from '../core/models/userAuth.model';
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
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

    const createUser: CreateUser = {
      email: that.formGroup.value.email,
      firstName: that.formGroup.value.firstName,
      lastName: that.formGroup.value.lastName,
      password: that.formGroup.value.password
    }

    that.authService.SignUp(createUser);
  }

}
