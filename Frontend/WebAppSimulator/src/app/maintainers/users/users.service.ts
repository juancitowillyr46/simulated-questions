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

  public readByUid(uid: string): Observable<any> {
    return this.db.list('/users', ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};
      });
    }));
  }

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

  public all(): Observable<User[]> {
    return this.http.get<User[]>(environment.firebase.databaseURL + '/users.json');
  }


  public updatePlanDateExp(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.firebase.databaseURL + '/users/' + user.key + '/planDateExpiration.json', body, {headers});
  }

  public updatePlanAssigned(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.firebase.databaseURL + '/users/' + user.key + '/planAssigned.json', body, {headers});
  }

  public updateEmailVerified(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.firebase.databaseURL + '/users/' + user.key + '/emailVerified.json', body, {headers});
  }

  public updateProducts(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.firebase.databaseURL + '/users/' + user.key + '/categories.json', body, {headers});
  }

  public updateSettingLanguage(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(environment.firebase.databaseURL + '/users/' + user.key + '/settingLanguage.json', body, {headers});
  }

  public postSettingLanguage(update: any, user: User): Observable<any> {
    const body = JSON.stringify(update);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(environment.firebase.databaseURL + '/users/' + user.key + '/settingLanguage.json', body, {headers});
  }
}
