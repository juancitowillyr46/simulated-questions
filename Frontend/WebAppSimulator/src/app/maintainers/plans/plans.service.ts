import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(
    private http: HttpClient
  ) { }

  public all(): Observable<Plan[]> {
    return this.http.get<Plan[]>(environment.firebase.databaseURL + '/plans.json');
  }

}
