import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<any>(`${this.apiUrl}/course`);
  }

  getCourseById(courseId: number) {
    return this.http.get<any>(`${this.apiUrl}/course/${courseId}`)
  }

  addCourse(course: Course) {
    return this.http.post<any>(`${this.apiUrl}/course`, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/update`, course);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${courseId}`);
  }

  getAllTags() {
    return this.http.get<any>(`${this.apiUrl}/course/tags`)
  }

  getCoursesByTag(tagId: number) {
    return this.http.get<any>(`${this.apiUrl}/course/tag/${tagId}`)
  }


}
