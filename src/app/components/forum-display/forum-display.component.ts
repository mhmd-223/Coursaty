import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumsComponent } from '../forums/forums.component';
import { FORUMS, USER } from '../../../static_data';
import { Post } from '../../models/post.model';
import { CourseService } from '../../services/course.service';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models/reply.model';
import { AuthService } from '../../services/auth.service';

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

  forums = FORUMS;
  discussion: Post | undefined;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseServ.getCourseById(+params['id']).subscribe(
        course => this.discussion = course.posts.find(post => post.id === +params['postId'])
      )
    });
  }

  newComment = '';
  isEmptyComment: boolean = false;
  addComment() {
    this.isEmptyComment = this.newComment === '';
    if (!this.isEmptyComment) {
      const newReply: Reply = {
        id: -1,
        content: this.newComment,
        date: new Date(),
        author: this.authServ.getUserData(),
        post_id: this.discussion?.id,
      }
      this.replyServ.addReply(newReply)
      this.discussion?.replies.push(newReply)
    }
    this.newComment = ''; // Clear the comment content after submission
  }
}