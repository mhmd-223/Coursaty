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
import { CourseModuleComponent } from './components/course-module/course-module.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { HomeComponent } from './components/home/home.component';
import { EnrolledCourseComponent } from './components/enrolled-course/enrolled-course.component';
import { ForumsComponent } from './components/forums/forums.component';
import { ForumDisplayComponent } from './components/forum-display/forum-display.component';
import { FormsModule } from '@angular/forms';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { NavigatorService } from './services/navigator.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/memorydata.service';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { TeachingPageComponent } from './components/teaching-page/teaching-page.component';
import { AddLessonsComponent } from './components/add-lessons/add-lessons.component';

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
    CourseModuleComponent,
    LessonComponent,
    HomeComponent,
    EnrolledCourseComponent,
    ForumsComponent,
    ForumDisplayComponent,
    CoursesPageComponent,
    QuizComponent,
    ProfilePageComponent,
    CreateCourseComponent,
    TeachingPageComponent,
    AddLessonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }), // Adjust delay as needed
  ],
  providers: [AuthService, NavigatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
