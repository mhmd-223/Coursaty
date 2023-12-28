import { Question } from "./quesion.model";

export interface Quiz {
    id: number;
    title: string;
    module: any;
    questions: Question[]
  }
  