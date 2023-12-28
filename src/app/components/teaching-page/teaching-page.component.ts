import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Module } from '../../models/module.model';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-teaching-page',
  templateUrl: './teaching-page.component.html',
  styleUrl: './teaching-page.component.css'
})
export class TeachingPageComponent implements OnInit {
  constructor(private courseServ: CourseService, private route: ActivatedRoute, private router: Router, private moduleServ: ModuleService) { }

  course: Course | null = null
  ngOnInit(): void {
    this.router.events.subscribe(
      () => {
        this.route.params.subscribe(
          params => {
            const id = +params['id']
            this.courseServ.getCourseById(id).subscribe(
              {
                next: res => this.course = res.data,
                error: err => console.error("Error getting course by id: ", err)

              }
            )
          }
        )

      }
    )
  }

  showLessons: { [moduleId: number]: boolean } = {};

  toggleLessons(moduleId: number): void {
    this.showLessons[moduleId] = !this.showLessons[moduleId];
  }

  isAddModuleFormOpen = false;
  newModuleTitle: string = '';
  newModuleDescription: string = '';

  openAddModuleForm(): void {
    this.isAddModuleFormOpen = true;
  }

  closeAddModuleForm(): void {
    this.isAddModuleFormOpen = false;

  }

  addModule(form: NgForm): void {
    const { title, description } = form.value

    if (this.course) {
      const newModule: Module = {
        id: 0,
        course: {id: this.course.id},
        lessons: [],
        title: title,
        description: description,
        quiz: null
      }

      console.log(newModule);
      

      this.moduleServ.addModule(newModule).subscribe(
        response => this.router.navigate(['courses/teaching', this.course?.id, 'addModule', response.data.id])
      )
      this.closeAddModuleForm();
      form.resetForm()
    }
  }
}
