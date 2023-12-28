import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {

  constructor(private userServ: UserService) { }

  calculateProgress(userId: any, courseId: any) {
    return this.userServ.getProgress(userId, courseId);
  }
}
