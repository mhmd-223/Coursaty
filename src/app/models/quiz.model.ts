import { Question } from "./quesion.model";

export interface Quiz {
    id: number;
    title: string;
    module_id: number;
    questions: Question[]
  }
  