import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reply } from '../models/reply.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private apiUrl = environment.apiUrl + "/reply";

  constructor(private http: HttpClient) { }

  addReply(reply: any, post_id: any) {
    return this.http.post<any>(`${this.apiUrl}/${post_id}`, reply);
  }


}
