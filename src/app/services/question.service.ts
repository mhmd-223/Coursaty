import { Injectable } from '@angular/core';
import { Question } from '../models/quesion.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'api/questions';

  constructor(private http: HttpClient) { }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question);
  }
}
