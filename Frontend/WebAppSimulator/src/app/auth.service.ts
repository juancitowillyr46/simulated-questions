import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { StorageInFirebase, CreateUser } from './core/models/userAuth.model';
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
  userAttr: any;//UserAuth

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

  SignUp(createUser: CreateUser) {
    const that = this;
    this.afAuth.auth.createUserWithEmailAndPassword(createUser.email, createUser.password)
    .then((result) => {

      const storageInFirebase: StorageInFirebase = {
        uid: result.user.uid,
        displayName: createUser.firstName + ' ' + createUser.lastName,
        email: createUser.email,
        emailVerified: false,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        photoURL: '',
        role: 'USER_STUDENT',
        active: true,
        createdAt: new Date()
      };

      that.SignUpSetData(storageInFirebase);

    }).catch((error) => {
      alert(error.message);
      // that.signUpObservable.changeMessage(error.message);
    });
  }

  SignUpSetData(storageInFirebase: StorageInFirebase) {
    const that = this;
    that.userService.create(storageInFirebase).subscribe( res => {
      if (res) {
        that.ngZone.run(() => {
          alert('Gracias por registrarte validaremos tus datos');
          that.router.navigate(['exams']);
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
