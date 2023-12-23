import { User } from "./user.model";

export interface Reply {
    id: number;
    content: string;
    date: Date;
    author: User | null;
    post_id: number | undefined;
  }
  