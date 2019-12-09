import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.services';
import { Subscription } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersAuthService } from '../user-list/usersauth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  userInfo: any;

  userSub: Subscription;
  comments = [];
  userEmail: string;
  isUserAuthenticated = false;

  userAuthSub: Subscription;
  form: FormGroup;
  commentForm: FormGroup;

  commentSub: Subscription;

  constructor(private commentService: CommentsService, private userAuth: UsersAuthService) {}
  ngOnInit() {
    this.userEmail = this.userAuth.getUserEmail();
    this.userAuthSub = this.userAuth
                .getUserAuthStatusListener().subscribe( isAuthenticated => {
                    this.isUserAuthenticated = isAuthenticated;
                    this.userEmail = this.userAuth.getUserEmail();
                  });

    this.userInfo = this.commentService.getUserInfo();

    this.userSub = this.commentService.getUserUpdatedListener().subscribe( res => {
      this.userInfo = res;
      console.log('User Info:', this.userInfo);
    });

    this.commentService.getComments(this.userInfo.id);
    this.commentService.getCommentsUpdatedListener()
      .subscribe( (commentsUp) => {
        this.comments = commentsUp;
        console.log(this.comments);
      });

    this.form = new FormGroup({
      content: new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.commentForm = new FormGroup({
      content: new FormControl('', {
        validators: []
      })
    });
  }

  onComment() {
    if (this.form.invalid) {
      return;
    }
    const content = this.form.value.content;
    console.log(content);
    this.commentService.addComments(this.userEmail, content);
    this.form.reset();
  }

  deleteComment(commentid: number) {
    this.commentService.deleteComment(commentid).subscribe(() => {
      this.commentService.getComments(this.userInfo.id);
      this.commentService.getCommentsUpdatedListener()
      .subscribe( (commentsUp) => {
        this.comments = commentsUp;
      });
    });
  }

  showForm(commentId: number) {
    const commentid = 'comment' + commentId;
    const commentForm = 'commenttext' + commentId;
    const editButtonId = 'edit' + commentId;
    const backButtonId = 'back' + commentId;
    const contentid = 'content' + commentId;

    const formVisibility = document.getElementById(commentid);
    console.log(formVisibility);
    formVisibility.classList.remove('hide-form');

    let content;
    const contentEle = document.getElementById(contentid);
    if (contentEle) {
      content = contentEle.innerHTML;
      contentEle.style.display = 'none';
    } else {
      content = '';
    }

    const formText = document.getElementById(commentForm) as HTMLInputElement;
    formText.value = content;
    formText.focus();

    const backButton = document.getElementById(backButtonId);
    backButton.classList.remove('hide-form');

    const editButton = document.getElementById(editButtonId);

    editButton.style.display = 'none';
  }

  backForm(commentid: number) {
    const editButtonId = 'edit' + commentid;
    const contentId = 'content' + commentid;
    const idName = 'comment' + commentid;
    const backButtonId = 'back' + commentid;

    const editButton = document.getElementById(editButtonId);
    editButton.style.display = '';

    const contentEle = document.getElementById(contentId);
    contentEle.style.display = '';

    const formVisibility = document.getElementById(idName);
    formVisibility.classList.add('hide-form');

    const backButton = document.getElementById(backButtonId);

    backButton.classList.add('hide-form');
  }

  editComment(commentid: number) {
    const saveButtonid = 'save' + commentid;
    const backButtonid = 'back' + commentid;

    const saveButton = document.getElementById(saveButtonid);
    saveButton.classList.remove('hide-form');

    const backButton = document.getElementById(backButtonid);
    backButton.classList.add('hide-form');
  }

  saveForm(commentid: number) {
    const saveButtonid = 'save' + commentid;
    const formContentId = 'commenttext' + commentid;
    const editButtonId = 'edit' + commentid;
    const contentId = 'content' + commentid;
    const idName = 'comment' + commentid;

    const saveButton = document.getElementById(saveButtonid);
    saveButton.classList.add('hide-form');

    const editButton = document.getElementById(editButtonId);
    editButton.style.display = '';

    const contentEle = document.getElementById(contentId);

    if (this.commentForm.invalid) {
      return;
    }

    const formText = document.getElementById(formContentId) as HTMLInputElement;
    const content = formText.value;
    const formVisibility = document.getElementById(idName);
    formVisibility.classList.add('hide-form');

    contentEle.style.display = '';
    contentEle.innerHTML = content;
    console.log('commentid', commentid, 'content', content);
    this.commentService.editComment(commentid, content.trim());
  }
}
