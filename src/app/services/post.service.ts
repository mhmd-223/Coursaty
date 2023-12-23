import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'api/replies';

  constructor(private http: HttpClient) { }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post> (this.apiUrl, post)
  }

}
