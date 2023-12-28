import { User } from "./user.model";

export interface Reply {
    id: number;
    content: string;
    date: Date;
    user: User | null;
  }
  