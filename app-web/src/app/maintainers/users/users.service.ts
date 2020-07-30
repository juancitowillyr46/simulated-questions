import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { User } from './user';
import { Observable, of, from, BehaviorSubject  } from 'rxjs';
// import { User } from 'src/app/core/models/user.model';
// import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  public list() {
    return this.http.get(
      environment.firebase.databaseURL + '/users.json'
    );
  }

  public create(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.firebase.databaseURL + '/users.json', body, {headers});
  }

  public read(key: string) {
    return this.http.get<any>(environment.firebase.databaseURL + '/users/' + key + '.json');
  }

  public update(key: string, data: any) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(environment.firebase.databaseURL + '/users/' + key + '.json', body, {headers});
  }

  public async getUserByKey(key: string) {
    return await this.db.database.ref('users/' + key).once('value').then( res => {
      return res.val();
    });
  }

  public async getUserByUid(uid: string) {
    return await this.db.database.ref('users').orderByChild('uid').equalTo(uid).once('value').then( res => {
      return res.val();
    });
  }


  public usersAll(): Observable<User[]> {
    let userList: User[] = [];
    userList.push({
      id: 1,
      email: 'jrodas@analytics.pe1',
      key: '2121212',
      planAssigned: 0,
      planDateExpiration: '',
      emailVerified: false,
      displayName: 'Juan Rodas',
      createdAt: '2019-08-07T06:12:42.694Z'
    });
    userList.push({
      id: 2,
      email: 'jrodas@analytics.pe2',
      key: '2121212',
      planAssigned: 1,
      planDateExpiration: '2020-07-30T23:59:59',
      emailVerified: true,
      displayName: 'Juan Rodas',
      createdAt: '2019-08-07T06:12:42.694Z'
    });
    userList.push({
      id: 3,
      email: 'jrodas@analytics.pe3',
      key: '2121212',
      planAssigned: 2,
      planDateExpiration: '2020-07-26T23:59:59',
      emailVerified: true,
      displayName: 'Juan Rodas',
      createdAt: '2019-08-07T06:12:42.694Z'
    });
    return new BehaviorSubject<User[]>(userList);
  }

}
