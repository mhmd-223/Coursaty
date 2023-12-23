// quiz-page.component.ts
import { Component, OnInit } from '@angular/core';
import { QUIZ } from '../../../static_data';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz | null = null


  constructor(private courseServ: CourseService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(
      qParams => {
        this.route.params.subscribe(
          params => this.courseServ.getCourseById(+params['id']).subscribe(
            course => this.quiz = course.courseModules[+qParams['module'] - 1].quiz
          )
        )
      }
    )

  }
  answers: number[] = [];
  score: number = 0;

  submitQuiz(): void {
    console.log(this.answers)
    this.answers.forEach((answer, i) => {
      if (answer === this.quiz?.questions[i].correct_answer) this.score++;
    })
    console.log(this.score)
  }
}
