import { Course } from "./course.model";
import { Lesson } from "./lesson.model";
import { Quiz } from "./quiz.model";

export interface Module {
    id: number;
    title: string | null;
    description: string | null;
    course: any | null;
    lessons: Lesson[];
    quiz: Quiz | null
  }
  