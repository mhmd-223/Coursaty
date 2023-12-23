import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reply } from '../models/reply.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private apiUrl = 'api/replies';

  constructor(private http: HttpClient) { }

  addReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(this.apiUrl, reply);
  }


}
