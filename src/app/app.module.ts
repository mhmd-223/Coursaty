import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { CourseStudyComponent } from './components/course-study/course-study.component';
import { CourseDisplayComponent } from './components/course-display/course-display.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownMenuComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    CardComponent,
    CourseStudyComponent,
    CourseDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
