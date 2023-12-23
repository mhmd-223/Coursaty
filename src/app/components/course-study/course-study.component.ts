import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER } from '../../../static_data';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-course-study',
  templateUrl: './course-study.component.html',
  styleUrl: './course-study.component.css'
})
export class CourseStudyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authServ: AuthService,
    private progressService: ProgressService
  ) { }

  user: User | null = this.authServ.getUserData();
  currentModule: number = 0;
  currentLesson: number = 0;
  progress: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const courseId = +params['id']; // Convert the string to a number
      this.course = this.user?.enrolledCourses.find(course => course.id === courseId);

    });

    if (this.course) {
      // for (let i = 0; i < this.course.courseModules.length; i++) {
      //   const module = this.course.courseModules[i];

      //   for (let j = 0; j < module.lessons.length; j++) {
      //     const lesson = module.lessons[j];

      //     if (lesson.isFinished) {
      //       this.currentModule = i;
      //       this.currentLesson = j;
      //     }
      //   }
      // }
      this.progress = this.progressService.calculateProgress(this.course);
    }

  }

  navigateLesson(off: number): void {
    if (this.course) {
      const currentModuleLessonsCount = this.course.courseModules[this.currentModule].lessons.length;
      this.currentLesson += off;
      if (this.currentLesson >= currentModuleLessonsCount) {
        this.currentLesson = currentModuleLessonsCount - 1;
      } else if (this.currentLesson < 0) {
        this.currentLesson = 0;
      }
    }
  }

  handleProgressUpdate(updatedProgress: number): void {
    this.progress = updatedProgress;
  }

  course: Course | undefined;
}
