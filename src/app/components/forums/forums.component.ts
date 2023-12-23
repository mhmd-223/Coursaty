import { Component, OnInit } from '@angular/core';
import { FORUMS } from '../../../static_data';
import { NavigatorService } from '../../services/navigator.service';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css'
})
export class ForumsComponent implements OnInit {


  // forums: any;
  forums: Post[] | undefined;
  courseTitle: string = ''
  showForm: boolean = false
  courseId: number = 0
  constructor(
    private route: ActivatedRoute,
    private courseServ: CourseService,
    private authServ: AuthService,
    private postServ: PostService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.courseId = +params['id']
        this.courseServ.getCourseById(this.courseId).subscribe(
          course => { this.forums = course.posts; this.courseTitle = course.title; }
        )
      }
    )
  }

  sortedAscByReplies = true;
  sortByRepliesCount() {
    if (this.sortedAscByReplies)
      this.forums?.sort((a, b) => a.replies.length - b.replies.length);
    else
      this.forums?.sort((b, a) => a.replies.length - b.replies.length);
    this.sortedAscByReplies = !this.sortedAscByReplies;
  }

  sortedAscByDate = true;
  sortByDate() {
    if (this.sortedAscByDate)
      this.forums?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else
      this.forums?.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.sortedAscByDate = !this.sortedAscByDate;
  }

  formatDateTime(date: Date): string {
    const pad = (value: number): string => (value < 10 ? `0${value}` : value.toString());
    date = new Date(date);

    const year: number = date.getFullYear();
    const month: string = pad(date.getMonth() + 1); // Adding 1 because months are 0-based
    const day: string = pad(date.getDate());
    const hours: number = date.getHours();
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: string = pad(hours % 12 || 12); // Convert 0 to 12 for midnight

    const minutes: string = pad(date.getMinutes());

    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
  }


  submitPost(post: NgForm) {
    const { postTitle, postContent } = post.value
    if (postTitle == '' || postContent == '') {
      alert('Post is empty')
      return
    }

    const newPost: Post = {
      id: -1,
      title: postTitle,
      content: postContent,
      date: new Date(),
      author: this.authServ.getUserData(),
      course_id: this.courseId,
      replies: []
    }

    this.postServ.addPost(newPost)
    this.showForm = false
  }


}
