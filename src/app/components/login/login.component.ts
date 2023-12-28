import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, of } from 'rxjs';
import { NavigatorService } from '../../services/navigator.service';
import { AppComponent } from '../../app.component';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isForgetPassOpen: boolean = false;
  constructor(
    private authService: AuthService,
    private navigatorService: NavigatorService,
    private userServ: UserService
  ) { }

  login(loginForm: NgForm) {
    const { email, password } = loginForm.value;

    this.authService.login(email, password)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response.data)
          this.handleSuccessfulLogin();
        else alert('Login failed: Incorrect email or password.')
      });
  }

  private handleSuccessfulLogin() {
    this.navigatorService.navigateTo('/');

  }


  forgetPass(form: NgForm) {
    const {email} = form.value
  
    alert("A message sent to " + email)
    this.userServ.recoverAcc(email).subscribe(
      () => alert("Your password changed successfully.\nTry to log in again.")
    )

    this.isForgetPassOpen = false
  }
}
