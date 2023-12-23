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

@Component({
  selector: 'app-add-lessons',
  templateUrl: './add-lessons.component.html',
  styleUrls: ['./add-lessons.component.css'],
})
export class AddLessonsComponent {
  id: number = 0;
  isQuizFormOpen = false;
  questionAnswers: number = 0;
  questions: Question[] = []

  constructor(
    private route: ActivatedRoute,
    private lessonServ: LessonService,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {
    this.route.params.subscribe((params) => (this.id = +params['moduleId']));
  }

  onSubmit(form: NgForm): void {
    const { lessonTitle, lessonUrl } = form.value;

    const newLesson: Lesson = {
      id: 0,
      module_id: this.id,
      url: lessonUrl,
      title: lessonTitle,
      isFinished: false,
    };

    this.lessonServ.addLesson(newLesson);

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
      module_id: this.id,
      questions: [],
      id: 0
    };

    this.quizService.addQuiz(newQuiz).subscribe((addedQuiz) => {
      this.questions.forEach(q => {
        q.quiz_id = addedQuiz.id;
        this.questionService.addQuestion(q)
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
      correct_answer: +correctAnswer,
      answers: answers,
      id: 0,
      quiz_id: 0
    };
    this.questions.push(newQuestion);
    form.resetForm()
  }
}
