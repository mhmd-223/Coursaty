import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';
import { CourseTag } from '../../models/tag.model';
import { NavigatorService } from '../../services/navigator.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private courseServ: CourseService, private navigator: NavigatorService, private progressServ: ProgressService) { }
  isloggedIn = this.authService.isAuthenticated();
  topCourses: Course[] = [];
  user: User | null = null;
  recommendedCourses: Course[] = [];

  ngOnInit(): void {

    this.navigator.executeOnChange(
      () => this.user = this.authService.getUserData()
    )

    this.courseServ.getCourses().subscribe(
      response => {
        // Get the top three courses
        response.data = response.data.sort((b: Course, a: Course) => a.subscribers - b.subscribers);
        this.topCourses = response.data.slice(0, 3);

        this.user?.enrollments.forEach(enrollment => {
          enrollment.course.tags = enrollment.course.tags.map((t: any) => t.tag.title);
          
          this.progressServ.calculateProgress(this.user?.id, enrollment.course.id).subscribe(
            (res) => {
              const progressRatio = res.data
              enrollment.course.progress = Math.round(progressRatio);
            }
          );
           console.log(enrollment.course.progress);

          const similarCourse = response.data.find((course: Course) =>
            this.hasCommonTags(enrollment.course.tags, course.tags.map((t: any) => t.tag.title)) && enrollment.course.id !== course.id
          );
          if (similarCourse) {
            this.recommendedCourses.push(similarCourse);
          }
        });
      }
    )
  }

  hasCommonTags(tags1: string[], tags2: string[]): boolean {
    return tags1.some(tag => tags2.includes(tag));
  }

  isStudent(): boolean {
    return this.user?.role === 'Student';
  }
}
