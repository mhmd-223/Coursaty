import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = environment.apiUrl + "/lesson";

  constructor(private http: HttpClient) { }

  addLesson(lesson: Lesson) {
    return this.http.post<any>(`${this.apiUrl}`, lesson);
  }
  toggleFinished(userId: any, lessonId: any) {
    return this.http.put<any>(`${this.apiUrl}/${userId}/${lessonId}`, null);
  }
  isFinished(userId: any, lessonId: any) {
    return this.http.get<any>(`${this.apiUrl}/${userId}/${lessonId}`);
  }
}
