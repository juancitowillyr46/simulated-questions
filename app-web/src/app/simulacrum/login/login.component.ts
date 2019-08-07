import { Component, OnInit, OnDestroy } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLock, faUser, faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { SharedObservable } from '../../observables/shared.observable';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../../core/models/user.model';
import { GeneratePassword } from '../../commons/generatePassword';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup = null;
  public submit: boolean;
  private user: User;
  public error: boolean;

  constructor(
    private routeActive: ActivatedRoute,
    private router: Router,
    private sharedObservable: SharedObservable,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    private generatePassword: GeneratePassword
    ) {
    library.add(faLock, faUser, faAppleAlt);
  }

  ngOnInit() {
    const that = this;
    that.formGroup = that.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.sharedObservable.changeHeader(false);
  }

  ngOnDestroy(): void {
    this.sharedObservable.changeHeader(true);
  }

  get f() { return this.formGroup.controls; }

  public login() {
    const that = this;

    if (that.formGroup.invalid === true) {
      that.submit = true;
      return false;
    }

    that.error = false;
    const users = this.db.list('/users', ref => ref.orderByChild('username').equalTo(that.formGroup.value.username));
    users.valueChanges().subscribe(res => {
      if (res.length > 0) {
        const findUsers: any = res[0];
        const password = that.generatePassword.encriptarPassword(that.formGroup.value.password);
        if (password === findUsers.password) {
          that.user = findUsers;
          this.router.navigate(['/simulacrum/examenavailable']);
          that.error = true;
        } else {
          that.error = true;
        }
      } else {
        that.error = true;
      }
    }, (err) => {
      console.log(err);
      that.error = true;
    });

  }

}
