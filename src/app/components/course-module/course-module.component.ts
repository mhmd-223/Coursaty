import { Component, Input, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrl: './course-module.component.css'
})
export class CourseModuleComponent {
  displayModuleDetails: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() lessons: string[] = [];
  toggle() {
    this.displayModuleDetails = !this.displayModuleDetails;
  }
}
