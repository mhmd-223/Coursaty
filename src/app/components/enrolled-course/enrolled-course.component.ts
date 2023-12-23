import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css', '../card/card.component.css']
})
export class EnrolledCourseComponent implements OnInit {
  @Input() course: Course | undefined;
  progress: number = 0;

  constructor(private progressServ: ProgressService) { }

  ngOnInit(): void {
    if (this.course)
      this.progress = this.progressServ.calculateProgress(this.course)
  }
}
