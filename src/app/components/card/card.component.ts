import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() course: Course | undefined
}
