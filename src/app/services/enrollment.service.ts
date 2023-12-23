import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'api/users';

  constructor(private http: HttpClient) { }

  addEnrollment(enrollment: Enrollment) {
    return this.http.post<Enrollment>(this.apiUrl, enrollment)
  }
}
