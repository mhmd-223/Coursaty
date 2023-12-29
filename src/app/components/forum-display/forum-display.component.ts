import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { CourseService } from '../../services/course.service';
import { ReplyService } from '../../services/reply.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-forum-display',
  templateUrl: './forum-display.component.html',
  styleUrl: './forum-display.component.css'
})
export class ForumDisplayComponent {

  constructor(
    private route: ActivatedRoute,
    private courseServ: CourseService,
    private replyServ: ReplyService,
    private authServ: AuthService
  ) { }

  discussion: Post | undefined;


  ngOnInit() {
    this.loadDB()
  }


  loadDB() {
    this.route.params.subscribe(params => {
      this.courseServ.getCourseById(+params['id']).subscribe(
        {
          next: response => {
            const course = response.data as Course;
            this.discussion = course.posts.find(post => post.id === +params['postId'])
          },
          error: err => console.error(err)
          
        }
      )
    });
  }

  newComment = '';
  isEmptyComment: boolean = false;
  addComment() {
    this.isEmptyComment = this.newComment === '';
    if (!this.isEmptyComment) {
      const newReply = {
        content: this.newComment,
        user: {email: this.authServ.getUserData()?.email},
      }
      console.log(newReply);
      
      this.replyServ.addReply(newReply, this.discussion?.id).subscribe(
        () => {this.loadDB(); this.authServ.refetch()}
      )
    }
    this.newComment = ''; // Clear the comment content after submission
  }
}