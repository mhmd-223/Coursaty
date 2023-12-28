import { Module } from "./module.model";
import { Post } from "./post.model";
import { User } from "./user.model";

export interface Course {
    id: number;
    title: string;
    brief: string;
    description: string;
    previewUrl: string;
    image: string;
    instructor: User | null;
    courseTags: number[];
    modules: Module[];
    posts: Post[];
    subscribers: number;
    tags: string[]
  }
  