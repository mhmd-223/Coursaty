import { Course } from "./course.model";
import { Enrollment } from "./enrollment.model";

export interface User {
  id: number;
  fullName: string;
  password: string;
  bio: string;
  image: string;
  email: string;
  role: string;
  courses: Course[],
  posts: any[],
  replies: any[],
  enrollments: Enrollment[]
}
