// add-course.component.ts
import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  constructor(private authServ: AuthService, private courseServ: CourseService, private router: Router) {}

  tags: any[] = []; // Change the type to any to store both title and id
  selectedTags: { id: number; title: string }[] = [];

  ngOnInit(): void {
    this.courseServ.getAllTags().subscribe((response) => {
      this.tags = response.data;
    });
  }

  toggleTag(tag: any): void {
    const existingTag = this.selectedTags.find((t) => t.title === tag.title);

    if (existingTag) {
      this.selectedTags = this.selectedTags.filter((t) => t.title !== tag.title);
    } else {
      this.selectedTags.push({ id: tag.id, title: tag.title });
    }
    console.log(this.selectedTags);
    
  }

  onSubmit(form: NgForm): void {
    const { title, brief, description, image, preview_url } = form.value;
    const newCourse: Course = {
      id: 0,
      title: title,
      brief: brief,
      description: description,
      image: image,
      previewUrl: preview_url,
      instructor: this.authServ.getUserData(),
      modules: [],
      posts: [],
      subscribers: 0,
      courseTags: this.selectedTags.map((tag) => tag.id),
      tags: []
    };

    console.log(newCourse);

    this.courseServ.addCourse(newCourse).subscribe({
      next: response => {
        this.authServ.refetch()
        this.router.navigate(['/courses/teaching', response.data.id]);
      },
      error: err => console.error(err)
      
    });
  }
}
