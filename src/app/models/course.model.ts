import { Module } from "./module.model";
import { Post } from "./post.model";
import { User } from "./user.model";

export interface Course {
    id: number;
    title: string;
    brief: string;
    description: string;
    preview_url: string;
    image: string;
    instructor: User | null;
    tags: string[];
    courseModules: Module[];
    posts: Post[];
    subscribers: number
  }
  