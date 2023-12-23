// add-course.component.ts
import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { NgForm } from '@angular/forms';
import { Role } from '../../models/user.model';
import { Module } from '../../models/module.model';
import { Lesson } from '../../models/lesson.model';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {

  constructor(private authServ: AuthService, private courseServ: CourseService, private router: Router) { }

  onSubmit(form: NgForm): void {
    const { title, brief, description, image, preview_url, tags } = form.value
    const newCourse: Course = {
      id: 0,
      title: title,
      brief: brief,
      description: description,
      image: image,
      preview_url: preview_url,
      instructor: this.authServ.getUserData(),
      courseModules: [],
      posts: [],
      subscribers: 0,
      tags: (tags as string).split('\n').filter(s => s !== '')
    }
    this.courseServ.addCourse(newCourse).subscribe(
      course =>
        this.router.navigate(['/courses/teaching', course.id])
    )
  }
}
