import { Component, Input, OnInit } from '@angular/core';
import { COURSES } from '../../../static_data';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent implements OnInit {


  constructor(private authService: AuthService, private courseServ: CourseService) { }
  isloggedIn = this.authService.isAuthenticated()
  topCourses: Course[] = []
  user: User | null = this.authService.getUserData()
  recommendedCourses: Course[] = []
  ngOnInit(): void {
    this.courseServ.getCourses().subscribe(
      courses => {

        // Get the top three courses
        courses = courses.sort((b, a) => a.subscribers - b.subscribers)
        this.topCourses = courses.slice(0, 3);

        // For each enrolled course, find a course with similar tags
        this.user?.enrolledCourses.forEach(userCourse => {
          const similarCourse = courses.find(course => this.hasCommonTags(userCourse.tags, course.tags) && userCourse.id != course.id);
          if (similarCourse)
            this.recommendedCourses.push(similarCourse)
        });
      }
    );
  }

  hasCommonTags(tags1: string[], tags2: string[]): boolean {
    return tags1.some(tag => tags2.includes(tag));
  }

  isStudent(): boolean {
    return this.user?.role?.toString() === 'Student'
  }
}