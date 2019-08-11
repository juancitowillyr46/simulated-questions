import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string;
  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) {
    const that = this;
    that.token = sessionStorage.getItem('token');
  }

  public login(username: any) {
    return this.db.list('/users', ref => ref.orderByChild('username').equalTo(username)).snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  public getUser() {
    const that = this;
    const token = sessionStorage.getItem('token');
    return this.http.get(environment.firebase.databaseURL + '/users/' + token + '.json');
  }

}
