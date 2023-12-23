import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrl: './course-module.component.css'
})
export class CourseModuleComponent {
  displayModuleDetails: boolean = false;
  @Input() module: Module | undefined;
  toggle() {
    this.displayModuleDetails = !this.displayModuleDetails;
  }
}
