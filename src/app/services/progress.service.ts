// progress.service.ts
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  calculateProgress(course: Course): number {
    let totalLessons = 0;
    let finishedLessons = 0;

    for (let i = 0; i < course.courseModules.length; i++) {
      const module = course.courseModules[i];

      for (let j = 0; j < module.lessons.length; j++) {
        const lesson = module.lessons[j];

        totalLessons++;

        if (lesson.isFinished) {
          finishedLessons++;
        }
      }
    }

    const progressRatio = totalLessons > 0 ? (finishedLessons / totalLessons) * 100 : 0;
    return Math.round(progressRatio);
  }
}
