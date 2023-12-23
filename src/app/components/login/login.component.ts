import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, of } from 'rxjs';
import { NavigatorService } from '../../services/navigator.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private navigatorService: NavigatorService
  ) { }

  login(loginForm: NgForm) {
    const { email, password } = loginForm.value;

    this.authService.login(email, password)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          return of(null);
        }),
        delay(500) // Simulate an asynchronous operation
      )
      .subscribe((response: User | null) => {
        if (response !== null) {
          this.handleSuccessfulLogin();
        } else alert('Login failed: Incorrect email or password.')
      });
  }

  private handleSuccessfulLogin() {
    this.navigatorService.navigateTo('/');
  }
}
