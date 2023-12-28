import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ProgressService } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css', '../card/card.component.css']
})
export class EnrolledCourseComponent {
  @Input() course: any;
}
