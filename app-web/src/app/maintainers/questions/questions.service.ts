import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../../core/models/question.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
    ) {}

  public list() {
    return this.http.get(
      environment.firebase.databaseURL + '/questions.json'
    );
  }

  public create(body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(environment.firebase.databaseURL + '/questions.json', body, {headers});
  }

  public read(key: string) {
    return this.http.get<Question>(environment.firebase.databaseURL + '/questions/' + key + '.json');
  }

  public update(key: string, question: Question) {
    const body = JSON.stringify(question);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(environment.firebase.databaseURL + '/questions/' + key + '.json', body, {headers});
  }

  public delete(key: string) {
    return this.http.delete<Question>(environment.firebase.databaseURL + '/questions/' + '/' + key + '.json');
  }

  public getQuestionsByKeyCategory(category: string) {
    return this.db.list('/questions', ref => ref.orderByChild("category").equalTo(category)).snapshotChanges()
    .pipe(map(items => {
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};
      });
    }));

  }

}
