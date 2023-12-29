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

  isOtpOpen: boolean = false;

  isUpdatePassOpen: boolean = false;

  email: string = "";
  
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
    this.userServ.generateOtp(email).subscribe(
      (response) => {
        if(response.message === "Success"){
          this.isForgetPassOpen = false
          this.email = email
          this.isOtpOpen = true
          alert("OTP sent to " + email)
        }else {
          alert("This email doesn't exist")
        }
      }
    )
    this.isForgetPassOpen = false
  }

  validateOtp(form: NgForm) {
    const {otp} = form.value
    const user = {email: this.email, otp: otp}
    this.userServ.checkOtp(user).subscribe(
      (response) => {
        if(response.message === "Success"){
          this.isOtpOpen = false
          this.isUpdatePassOpen = true
        }else{
          alert("OTP doesn't match")
        }
    }
    )
    this.isOtpOpen = false
  }

  updatePassword(form: NgForm) {
    const {password, confirmedPassword} = form.value
    if(password !== confirmedPassword){ 
      alert("Password and confirmed password don't match")
      form.resetForm()
      return
    }
    const user = {email: this.email, password: password}
    this.userServ.changePassword(user).subscribe(
      (response) => {
        if(response.message === "Success"){
          alert("Password Changed Successfully!")
          this.isOtpOpen = false
          this.isUpdatePassOpen = false
        }
    }
    )
    this.isUpdatePassOpen = false
}
}
