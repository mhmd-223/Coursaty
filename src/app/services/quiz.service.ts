import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addQuiz(quiz: Quiz) {
    return this.http.post<any>(`${this.apiUrl}/module/quiz`, quiz);
  }
  submitQuiz(quiz: any) {
    return this.http.post<any>(`${this.apiUrl}/module/submitQuiz`, quiz);
  }
}
