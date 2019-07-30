import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../core/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

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
}
