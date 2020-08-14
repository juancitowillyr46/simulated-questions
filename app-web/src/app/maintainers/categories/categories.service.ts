import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient, 
    private db: AngularFireDatabase
  ) {

  }

  public list() {
    return this.http.get(
      environment.firebase.databaseURL + '/categories.json'
    );
  }

  public create(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.firebase.databaseURL + '/categories.json', body, {headers});
  }

  public listDB(query) {
    return this.db.list('/categories', ref => ref.child(query)).snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  public getAllcategories() {
    return this.db.list('/categories').snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  public read(key: string) {
    return this.http.get<any>(environment.firebase.databaseURL + '/categories/' + key + '.json');
  }

  public update(key: string, data: any) {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(environment.firebase.databaseURL + '/categories/' + key + '.json', body, {headers});
  }

  public async getCategory(key: string) {
    return await this.db.database.ref('categories').orderByChild('clientKey').equalTo(key).once('value').then( res => {
      const key = Object.keys(res.val());
      let data = res.val();
      return data[key[0]];
    });
  }

  // public getCategoriesActive() {
  //   let data = [];
  //   return this.db.list('/categories', ref => ref.orderByChild("active").equalTo(true) ).snapshotChanges()
  //   .pipe(map(items => {
  //     data = [];
  //     items.forEach(element => {
  //       let value = element.payload.val()
  //       data.push(value);
  //     });
  //     return {data};
  //   }));
  // }

  public getCategories(arrKeyCategories) {
    let data = [];
    return this.db.list('/categories', ref => ref.orderByChild("active").equalTo(true) ).snapshotChanges()
    .pipe(map(items => {
      items.forEach(element => {
        let value = element.payload.val()
        if(arrKeyCategories.find(f => f.key === value['clientKey'])) {
          data.push(value);
        }
      });
      return {data};
    }));
  }

  public allQueryDB(): Observable<any[]> {
    const that = this;
    let data = [];
    return that.db.list('/categories', ref => ref.orderByChild("active").equalTo(true) ).snapshotChanges()
    .pipe(map(items => {
      items.forEach(element => {
        let value = element.payload.val()
        data.push(value);
      });
      return data;
    }));
  }

  public all(): Observable<any[]> {
    let data: any[] = [];
    return this.http.get<any[]>(environment.firebase.databaseURL + '/categories.json?orderBy="active"&startAt=true&print=pretty').pipe(map(items => {
      let keys = Object.keys(items);
      keys.forEach((user, key) => {
        items[user]['key'] = keys[key];
        items[user]['name'] = items[user]['name'].toUpperCase(); 
        data.push(items[user]);
      });
      return data;
    }));
  }

}
