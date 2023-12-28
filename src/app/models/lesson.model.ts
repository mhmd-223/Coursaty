import { Module } from "./module.model";

export interface Lesson {
  id: number;
  title: string;
  url: string;
  module: any;
  isFinished: boolean,
  userId: any
}
