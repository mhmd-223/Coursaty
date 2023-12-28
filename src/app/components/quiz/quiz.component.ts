// quiz-page.component.ts
import { Component, OnInit } from '@angular/core';
import { QUIZ } from '../../../static_data';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { AuthService } from '../../services/auth.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null


  constructor(private courseServ: CourseService, private route: ActivatedRoute, private authServ: AuthService, private quizServ: QuizService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(
      qParams => {
        this.route.params.subscribe(
          params => this.courseServ.getCourseById(+params['id']).subscribe(
            response => this.quiz = response.data.modules[+qParams['module'] - 1].quiz
          )
        )
      }
    )

  }
  answers: number[] = [];
  score: number = 0;

  submitQuiz(): void {
    this.answers.forEach((answer, i) => {
      if (answer === this.quiz?.questions[i].correctAnswer) this.score++;
    })
    const quiz = {
      score: this.score,
      user: {
        id: this.authServ.getUserData()?.id
      },
      quiz: {
        id: this.quiz?.id
      }
    }
    this.quizServ.submitQuiz(quiz).subscribe(
      () => alert(`Quiz submitted\nYour correct answers are ${this.score} out of ${this.quiz?.questions.length}`)
    )
  }
}
