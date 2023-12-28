import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Lesson } from '../../models/lesson.model';
import { ProgressService } from '../../services/progress.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LessonService } from '../../services/lesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  courseId: number | undefined = -1;
  moduleNumber: number = 0;
  lessonNumber: number = 0;
  isFinished: boolean = false

  course: Course | undefined
  constructor(private courseServ: CourseService, private route: ActivatedRoute, private authServ: AuthService, private lessonServ: LessonService) { }
  lesson: Lesson | undefined;
  ngOnInit(): void {
    this.route.params.subscribe(
      params => this.courseId = +params['id']
    );

    this.route.queryParams.subscribe(params => {
      this.moduleNumber = +params['module'];
      this.lessonNumber = +params['lesson'];
    });

    if (this.courseId) {
      this.courseServ.getCourseById(this.courseId).subscribe(
        response => {
          const course = response.data as Course;
          this.course = course;
          this.lesson = course.modules[this.moduleNumber - 1].lessons[this.lessonNumber - 1];

          // Check lesson status after course and lesson data are loaded
          this.checkIsFinished();
        },
        error => {
          console.error('Error retrieving course:', error);
        }
      );
    }
  }

  toggleLessonStatus(): void {
    if (this.lesson) {
      this.lessonServ.toggleFinished(this.authServ.getUserData()?.id, this.lesson.id).subscribe({
        next: () => {
          // Check lesson status after toggling finished status
          this.checkIsFinished();
        },
        error: err => console.error(err)
      });
    }
  }

  checkIsFinished() {
    if (this.lesson) {
      this.lessonServ.isFinished(this.authServ.getUserData()?.id, this.lesson.id).subscribe(
        res => this.isFinished = res.data.finished as boolean
      );
    }
    return this.isFinished;
  }

}
