import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentsService {
  private userInfo: any;
  private userInfoUpdated = new Subject<any>();
  private comments = [];
  private commentsUpdated = new Subject<any>();

  constructor(private http: HttpClient) {}

  getComments(postid: number) {
    this.http
    .get< {message: string, comments: any} >('http://localhost:3000/api/post/comments/' + postid)
    .pipe(
      map(commentData => {
        return commentData.comments.map( comment => {
          return {
            email: comment.email,
            content: comment.content,
            id: comment.id
          };
        });
      }
      )
    ).subscribe( updatedComments => {
      this.comments = updatedComments;
      this.commentsUpdated.next([... this.comments]);
    });
  }

  setUserInfo(user: any) {
    this.userInfo = user;
    this.userInfoUpdated.next(user);
  }

  getUserUpdatedListener() {
    return this.userInfoUpdated.asObservable();
  }

  getCommentsUpdatedListener() {
    return this.commentsUpdated.asObservable();
  }

  getUserInfo() {
    return this.userInfo;
  }

  addComments(email: string, content: string) {
    const commentBody = {
      email,
      content
    };
    console.log('Email:', email, 'Content:', content);
    this.http
    .post<{message: string, comment: any}>(
      'http://localhost:3000/api/post/comment/' + this.userInfo.id,
      commentBody
    ).subscribe( res => {
      if (res.message === 'success') {
        const newComment = {
          id: res.comment.cid,
          email: res.comment.email,
          content: res.comment.content
        };

        this.comments.push(newComment);
        this.commentsUpdated.next([... this.comments]);
      }
    });
  }

  deleteComment(commentid: number) {
    return this.http.delete('http://localhost:3000/api/post/comment/' + commentid);
  }

  editComment(commentid: number, content: string) {

    const contentBody = {content};
    this.http
    .put<{message: string}>(
      'http://localhost:3000/api/post/comment/' + commentid,
      contentBody
    ).subscribe( res => {
      if (res.message === 'success') {
        console.log('Comment Updated Successfully');
      }
    });
  }
}
