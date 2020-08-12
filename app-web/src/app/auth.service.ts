import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { UserAuth } from './core/models/userAuth.model';
import { Observable } from 'rxjs';
import { LoginObservable } from './login/login.observable';
import { AuthObservable } from './auth.observable';
import { UsersService } from './maintainers/users/users.service';
import { SignUpObservable } from './signup/signup.observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userNavigate: any = '';
  userRole: any = '';
  userAttr: UserAuth;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public loginService: LoginService,
    public ngZone: NgZone,
    public loginObservable: LoginObservable,
    public signUpObservable: SignUpObservable,
    public authObservable: AuthObservable,
    public userService: UsersService,
    
  ) {
    const that = this;
  }

  async signIn(email: string, password: string) {
    const that = this;
    return await that.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  SignOut() {
    const that = this;
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.localStorage.clear();
      that.router.navigate(['signin']);
    });
  }

  SignUp(userAuth: UserAuth) {
    const that = this;
    this.afAuth.auth.createUserWithEmailAndPassword(userAuth.email, userAuth.password)
    .then((result) => {
      const uid: any = result.user.uid;
      userAuth.uid = uid;
      userAuth.password = null;
      that.SignUpSetData(userAuth);
    }).catch((error) => {
      that.signUpObservable.changeMessage(error.message);
    });
  }

  SignUpSetData(userAuth) {
    const that = this;
    that.userService.create(userAuth).subscribe( res => {
      if (res) {
        that.ngZone.run(() => {
          that.router.navigate(['dashboard']);
        });
      }
    });
  }

  get isLoggin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  StateAuth(): Observable<any> {
    const that = this;
    return that.afAuth.authState;
  }

}
