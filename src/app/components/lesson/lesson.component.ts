import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Lesson } from '../../models/lesson.model';
import { ProgressService } from '../../services/progress.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  courseId: number | undefined = -1;
  moduleNumber: number = 0;
  lessonNumber: number = 0;


  course: Course | undefined
  constructor(private courseServ: CourseService, private route: ActivatedRoute) { }
  lesson: Lesson | undefined;

  ngOnInit(): void {

    this.route.params.subscribe(
      params => this.courseId = +params['id']
    )
    this.route.queryParams
      .subscribe(params => {
        this.moduleNumber = +params['module']
        this.lessonNumber = +params['lesson']
      }
      );

    if (this.courseId)
      this.courseServ.getCourseById(this.courseId).subscribe(
        course => {
          this.lesson = course.courseModules[this.moduleNumber - 1].lessons[this.lessonNumber - 1]
          this.course = course
        }
      );


  }

  toggleLessonStatus(): void {
    if (this.lesson) {
      this.lesson.isFinished = !this.lesson.isFinished;
      if (this.course)
        this.courseServ.updateCourse(this.course)
    }
  }
}
