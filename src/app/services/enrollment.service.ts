import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addEnrollment(user: any, id: number | undefined) {
    return this.http.post<any>(`${this.apiUrl}/enrollment/${id}`, user)
  }
}
