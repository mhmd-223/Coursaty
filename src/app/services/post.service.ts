import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = environment.apiUrl + "/post";

  constructor(private http: HttpClient) { }

  addPost(request: any) {
    return this.http.post<Post> (`${this.apiUrl}/${request.courseId}`, request)
  }

}
