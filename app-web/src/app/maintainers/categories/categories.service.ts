import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

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

    // return this.db.database.ref('/categories').child('clientKey').setWi
    
    // ).snapshotChanges()
    // .pipe(map(items => {
    //   return items.map(a => {
    //     const data = a.payload.val();
    //     const key = a.payload.key;
    //     return {key, data};           // or {key, ...data} in case data is Obj
    //   });
    // }));
  }

}
