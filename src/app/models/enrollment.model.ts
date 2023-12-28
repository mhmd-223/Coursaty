import { Course } from "./course.model";
import { User } from "./user.model";

export interface Enrollment {
    user: any;
    course: any ;
    date: Date;
  }
  