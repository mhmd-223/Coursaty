import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { NavigatorService } from './services/navigator.service';
import { NgForm } from '@angular/forms';
import { CourseService } from './services/course.service';
import { Course } from './models/course.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {


  loggedIn: boolean = false;
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private navigator: NavigatorService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.navigator.executeOnChange(
      () => {
        this.user = this.authService.getUserData();
        this.loggedIn = this.authService.isAuthenticated();
      }
    )
  }

  hidden: boolean = false;
  enablDarkMode: boolean = false;
  title = 'Coursaty';


  search(search: NgForm) {
    const query = search.value;
    if (query !== '') {
      this.navigator.navigateToWithQuery('/courses', query['query'])
    }
  }
  navbarItems: { title: string; paths: string[]; link: string }[] = [
    { title: 'Home', link: '/', paths: ['M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z', 'M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z'] },
    { title: 'Courses', link: '/courses', paths: ['M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z'] },
  ];
}

