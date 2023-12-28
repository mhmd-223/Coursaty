import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
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
  roles = ['Student', 'Instructor'];
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
      const newUser = {
        fullName: fullname.trim(),
        password,
        bio: 'No bio yet',
        image: '/assets/pic.jpg',
        email,
        role: role,
      };

      this.authService.signup(newUser).subscribe(
        userData => {
          if (userData) {
            this.handleSuccessfulSignup();
          }
        }
      );

    }
  }
  handleSuccessfulSignup() {
    this.navigator.navigateTo('/')
  }
}
