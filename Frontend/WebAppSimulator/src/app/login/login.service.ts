import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UsersService } from '../maintainers/users/users.service';
import { AuthService } from '../auth.service';
// import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
    const that = this;
  }

  public addSession(response: any): boolean {
      const that = this;
      let key = Object.keys(response);
      let user = response[key[0]];
      localStorage.setItem('userId', key.toString());
      localStorage.setItem('user', JSON.stringify(user));
      return true;
  }

  public getAttrSession(key: string): any {
    const user = JSON.parse(localStorage.getItem('user'));
    return user[key];
  }

}
