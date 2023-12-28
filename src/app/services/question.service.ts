import { Injectable } from '@angular/core';
import { Question } from '../models/quesion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addQuestion(question: Question) {
    return this.http.post<any>(`${this.apiUrl}/module/question`, question);
  }
}
