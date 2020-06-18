import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

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

    // this.db.database.ref('users').orderByChild('uid').equalTo('A0fPwwDdl5c6x4JNAdKcXxEDwm23').once('value').then( res => {
    //   console.log(res);
    // }); 

    return await this.db.database.ref('users/' + key).once('value').then( res => {
      return res.val();
    });
    // return this.db.list('/users/', ref => ref.orderByChild("uid").equalTo(uid) ).snapshotChanges()
    // .pipe(map(items => {
    //   return items.map(a => {
    //     const data = a.payload.val();
    //     const key = a.payload.key;
    //     return {key, data};           // or {key, ...data} in case data is Obj
    //   });
    // }));

    // return this.db.database.ref('users').child('-LnFFh1I0l34rcV5nSrD').equalTo('uid', uid).;
  }

  

}
