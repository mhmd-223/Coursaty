import { Component } from '@angular/core';

@Component({
  selector: 'app-course-display',
  templateUrl: './course-display.component.html',
  styleUrl: './course-display.component.css'
})
export class CourseDisplayComponent {
  displayModuleDetails: boolean = false;
  course: any;

  toggle() {
    this.displayModuleDetails = !this.displayModuleDetails;
  }

}
