import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Role, User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { catchError, delay, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  roles = Object.keys(Role);
  emailNotValid: boolean = false;
  passwordsNotMatch: boolean = false;
  nameNotValid: boolean = false;

  constructor(private authService: AuthService, private navigator: NavigatorService) { }

  submit(form: NgForm) {
    if (form.valid) {
      // Extract form values
      const { fullname, email, password, confirmpass, role } = form.value;

      // Check name is only alphabetical
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(fullname)) {
        console.error('invalid name')
        this.nameNotValid = true
        return
      }

      // Check if passwords match
      if (password !== confirmpass) {
        this.passwordsNotMatch = true;
        return;
      }

      // Create a user object
      const newUser: User = {
        id: 0,
        fullname,
        password,
        bio: 'No bio yet',
        image: '../assets/pic.jpg',
        email,
        role: role,
        enrolledCourses: [],
        stats: {
          coursesCompleted: 0,
          repliesMade: 0,
          postsMade: 0
        }
      };

      // Call the signup method from AuthService
      this.authService.signup(newUser).pipe(
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          return of(null);
        }),
        delay(200) // Simulate an asynchronous operation
      )
        .subscribe((response: User | null | string) => {
          console.log(response)
          if (response === 'email')
            this.emailNotValid = true;
          else if (response !== null) {
            this.handleSuccessfulSignup();
          }
        });
    }
  }
  handleSuccessfulSignup() {
    this.navigator.navigateTo('/')
  }
}
