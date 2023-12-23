// in-memory-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Course } from '../models/course.model';
import { Module } from '../models/module.model';
import { Lesson } from '../models/lesson.model';
import { Post } from '../models/post.model';
import { Reply } from '../models/reply.model';
import { User } from '../models/user.model';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/quesion.model';
import { Enrollment } from '../models/enrollment.model';
import { CourseTag } from '../models/tag.model';
import { Role } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const courses: Course[] = [
      {
        id: 1,
        title: 'Introduction to Angular',
        brief: 'Learn the basics of Angular framework',
        description: 'This course covers the fundamentals of Angular for web development.',
        preview_url: 'https://example.com/angular-preview',
        image: '/assets/JS.png',
        instructor: {
          id: 2,
          fullname: 'John Doe',
          password: 'hashedpassword',
          bio: 'Passionate about web development',
          image: '../../assets/pic.jpg',
          email: 'john.doe@example.com',
          role: Role.Student,
          enrolledCourses: [],
          stats: {
            coursesCompleted: 0,
            repliesMade: 0,
            postsMade: 0,

          }
        },
        tags: ['angular', 'web development'],
        courseModules: [
          {
            id: 1,
            title: 'Getting Started',
            description: 'Introduction and setup of Angular',
            course_id: 1,
            lessons: [
              {
                id: 1,
                title: 'Installing Angular CLI',
                url: 'https://example.com/angular-cli-installation',
                module_id: 1,
                isFinished: false,
              },
              {
                id: 2,
                title: 'Installing Angular CLI2',
                url: 'https://example.com/angular-cli-installation',
                module_id: 1,
                isFinished: false,
              },
              {
                id: 3,
                title: 'Installing Angular CLI3',
                url: 'https://example.com/angular-cli-installation',
                module_id: 1,
                isFinished: true,
              },
              // Add more lessons as needed
            ],
            quiz: {
              id: 0,
              title: 'quiz 1',
              questions: [
                {
                  id: 0,
                  quiz_id:0,
                  answers: ['asdf', 'asdf', 'asfd', 'asdf'],
                  correct_answer: 1,
                  question: "jkasdf ?"
                  
                }
              ],
              module_id: 1
            }
          },
          // Add more modules as needed
        ],
        posts: [
          {
            id: 1,
            title: 'Angular Discussion',
            content: 'Let\'s discuss Angular topics here!',
            date: new Date(),
            author: {
              id: 2,
              fullname: 'John Doe',
              password: 'hashedpassword',
              bio: 'Passionate about web development',
              image: '../../assets/pic.jpg',
              email: 'john.doe@example.com',
              role: Role.Student,
              enrolledCourses: [],
              stats: {
                coursesCompleted: 0,
                repliesMade: 0,
                postsMade: 0,

              }
            },
            course_id: 1,
            replies: [
              {
                id: 1,
                content: 'Great course! I learned a lot.',
                date: new Date(),
                author: {
                  id: 1,
                  fullname: 'Instructor Name',
                  password: '123',
                  bio: 'Experienced instructor in web development',
                  image: '../assets/pic.jpg',
                  email: 'instructor@example.com',
                  role: Role.Instructor,
                  enrolledCourses: [],
                  stats: {
                    postsMade: 1,
                    repliesMade: 5,
                    coursesCompleted: 0,
                  },
                },
                post_id: 1,
              },
              // Add more replies as needed
            ],
          },
          // Add more posts as needed
        ],
        subscribers: 10
      },
      // Add more courses as needed
    ];

    const modules: Module[] = [
      // If you want a separate collection for modules, otherwise, you can include modules within each course
    ];

    const lessons: Lesson[] = [
      // If you want a separate collection for lessons, otherwise, you can include lessons within each module
    ];

    const posts: Post[] = [
      // If you want a separate collection for posts, otherwise, you can include posts within each course
    ];

    const replies: Reply[] = [
      // If you want a separate collection for replies, otherwise, you can include replies within each post
    ];

    const users: User[] = [
      {
        id: 1,
        fullname: 'Instructor Name',
        password: '123',
        bio: 'Experienced instructor in web development',
        image: '../assets/pic.jpg',
        email: 'instructor@example.com',
        role: Role.Instructor,
        enrolledCourses: courses.slice(0, 3),
        stats: {
          postsMade: 1,
          repliesMade: 5,
          coursesCompleted: 0,
        },
      },
      {
        id: 2,
        fullname: 'John Doe',
        password: '123',
        bio: 'Passionate about web development',
        image: '../assets/pic.jpg',
        email: 'john.doe@example.com',
        role: Role.Student,
        enrolledCourses: [courses[0]],
        stats: {
          postsMade: 0,
          repliesMade: 0,
          coursesCompleted: 2,
        },
      }
      // Add more users as needed
    ];

    const quizzes: Quiz[] = [
      // Add quizzes if applicable
    ];

    const questions: Question[] = [
      // Add questions if applicable
    ];

    const enrollments: Enrollment[] = [
      // Add enrollments if applicable
    ];

    const courseTags: CourseTag[] = [
      // Add course tags if applicable
    ];

    return { courses, modules, lessons, posts, replies, users, quizzes, questions, enrollments, courseTags };
  }
}
