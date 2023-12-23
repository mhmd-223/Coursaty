import { Lesson } from "./lesson.model";
import { Quiz } from "./quiz.model";

export interface Module {
    id: number;
    title: string;
    description: string;
    course_id: number;
    lessons: Lesson[];
    quiz: Quiz | null
  }
  