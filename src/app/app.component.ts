import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hidden: boolean = false;
  enablDarkMode: boolean = false;

  title = 'Coursaty';
}
