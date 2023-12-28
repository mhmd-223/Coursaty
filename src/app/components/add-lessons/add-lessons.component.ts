// add-lessons.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { Quiz } from '../../models/quiz.model';
import { Question } from '../../models/quesion.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-lessons',
  templateUrl: './add-lessons.component.html',
  styleUrls: ['./add-lessons.component.css'],
})
export class AddLessonsComponent {
  id: number = 0;
  courseId: number = 0;
  isQuizFormOpen = false;
  questionAnswers: number = 0;
  questions: Question[] = []

  constructor(
    private route: ActivatedRoute,
    private lessonServ: LessonService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private authServ: AuthService,
  ) {
    this.route.params.subscribe((params) => { this.id = +params['moduleId']; this.courseId = +params['id'] });
  }

  onSubmit(form: NgForm): void {
    const { lessonTitle, lessonUrl } = form.value;

    const newLesson: Lesson = {
      id: 0,
      module: { id: this.id },
      url: lessonUrl,
      title: lessonTitle,
      isFinished: false,
      userId: this.authServ.getUserData()?.id
    };

    this.lessonServ.addLesson(newLesson).subscribe(
      {
        next: () => alert("Lesson added Successfully"),
        error: err => console.error(err)
      }
    )

    form.resetForm();
  }

  openQuizForm(): void {
    this.isQuizFormOpen = true;
  }

  closeQuizForm(): void {
    this.isQuizFormOpen = false;
  }

  onQuizSubmit(form: NgForm): void {
    const { title } = form.value;

    const newQuiz: Quiz = {
      title: title,
      module: {id: this.id},
      questions: [],
      id: 0
    };
    console.log(newQuiz);
    
    this.quizService.addQuiz(newQuiz).subscribe((response) => {
      const addedQuiz = response.data as Quiz;
      this.questions.forEach(q => {
        q.quiz = addedQuiz;
        console.log(q);
        
        this.questionService.addQuestion(q).subscribe(
          {
            next: () => console.log('Question added'),
            error: err => console.error('Error', err),
          }
        )
      })

      form.resetForm();
      this.closeQuizForm();

      alert(`Successfully created quiz with ${this.questions.length} questions.`);
    });
  }



  onQuestionSubmit(form: NgForm): void {
    const { question, correctAnswer, answer1, answer2, answer3, answer4 } = form.value;

    const answers = [answer1, answer2, answer3, answer4].filter(ans => ans != '')
    const newQuestion: Question = {
      question: question,
      correctAnswer: +correctAnswer,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[3],
      answer4: answers[4],
      id: 0,
      quiz: {}
    };
    this.questions.push(newQuestion);
    form.resetForm()
  }
}
