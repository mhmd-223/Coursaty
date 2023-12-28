import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER } from '../../../static_data';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';
import { ProgressService } from '../../services/progress.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-study',
  templateUrl: './course-study.component.html',
  styleUrl: './course-study.component.css'
})
export class CourseStudyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseServ: CourseService,
    private authServ: AuthService,
    private progressService: ProgressService
  ) { }


  currentModule: number = 0;
  currentLesson: number = 0;
  progress:number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user = this.authServ.getUserData()
      const courseId = +params['id']; // Convert the string to a number      
      this.courseServ.getCourseById(courseId).subscribe(
        res => this.course = res.data
      )
      this.progressService.calculateProgress(this.authServ.getUserData()?.id, courseId).subscribe(
        res => {
          this.progress = Math.round(res.data);
        }
      )

    });
  }


  getProgress() {
    return this.progress
  }
  course: Course | undefined;
}
