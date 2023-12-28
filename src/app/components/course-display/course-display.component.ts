import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesPageComponent } from '../courses-page/courses-page.component';
import { COURSES, USER } from '../../../static_data';
import { NavigatorService } from '../../services/navigator.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Enrollment } from '../../models/enrollment.model';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-display',
  templateUrl: './course-display.component.html',
  styleUrl: './course-display.component.css'
})
export class CourseDisplayComponent implements OnInit {
  displayModuleDetails: boolean = false;
  course: Course | undefined;
  courses: Course[] | undefined;

  toggle() {
    this.displayModuleDetails = !this.displayModuleDetails;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enrollServ: EnrollmentService,
    private authServ: AuthService,
    private courseServ: CourseService
  ) { }

  ngOnInit() {

    this.courseServ.getCourses().subscribe(
      courses => {
        this.courses = courses.data
        this.route.params.subscribe(params => {
          const courseId = +params['id']; // Convert the string to a number
          this.course = this.courses?.find(course => course.id === courseId);
        });
      }
    )
  }


  enroll() {

    const user = {
      id: this.authServ.getUserData()?.id
    }

    this.enrollServ.addEnrollment(user, this.course?.id).subscribe({
      next: () => {
        this.router.navigate(['/courses', this.course?.id, 'study'])
        alert(
          this.authServ.isAuthenticated() ? `Enrolled at ${this.course?.title} succsessfully.` : 'You are not logged in'
        )
        this.authServ.refetch()
      },
      error: err => console.error("Error enrolling ", err)

    })
  }
}
