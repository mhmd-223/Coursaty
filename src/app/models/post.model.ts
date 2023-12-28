import { Reply } from "./reply.model";
import { User } from "./user.model";

export interface Post {
    id: number;
    title: string;
    content: string;
    date: Date;
    user: User | null;
    course_id: number;
    replies: Reply[]
  }
  