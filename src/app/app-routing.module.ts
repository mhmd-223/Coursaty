import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ForumsComponent } from './components/forums/forums.component';
import { ForumDisplayComponent } from './components/forum-display/forum-display.component';
import { CourseDisplayComponent } from './components/course-display/course-display.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CourseStudyComponent } from './components/course-study/course-study.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LessonComponent } from './components/lesson/lesson.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { TeachingPageComponent } from './components/teaching-page/teaching-page.component';
import { AddLessonsComponent } from './components/add-lessons/add-lessons.component';
import { AccSettingsComponent } from './components/acc-settings/acc-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: CoursesPageComponent },
  { path: 'courses/create', component: CreateCourseComponent},
  { path: 'courses/teaching/:id', component: TeachingPageComponent},
  { path: 'courses/teaching/:id/addModule/:moduleId', component: AddLessonsComponent},
  { path: 'courses/:id', component: CourseDisplayComponent },
  { path: 'courses/:id/posts', component: ForumsComponent },
  { path: 'courses/:id/posts/:postId', component: ForumDisplayComponent, pathMatch: 'full' },
  { path: 'courses/:id/study', component: CourseStudyComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id/studying', component: LessonComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id/quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/settings', component: AccSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
