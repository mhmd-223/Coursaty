import { Course } from "./course.model";

export interface User {
  id: number;
  fullname: string;
  password: string;
  bio: string;
  image: string;
  email: string;
  // interest: Interest;
  role: Role;
  enrolledCourses: Course[],
  stats: {
    postsMade: number;
    repliesMade: number;
    coursesCompleted: number;
  }
}

export enum Interest {
  Programming = 'Programming',
  LanguageLearning = 'Language Learning',
  Chess = 'Chess',
}

export enum Role {
  Student = 'Student',
  Instructor = 'Instructor',
}
