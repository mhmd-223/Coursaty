import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css', '../card/card.component.css']
})
export class EnrolledCourseComponent {
  @Input() title: string = 'java';
  @Input() cover: string = '../../../assets/JS.png';
  @Input() progress: number = 50;
}
