import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;
  public showableErrorMsg: string;
  public username: string;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.username = this.user.value.username;
    
    this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.userService.setUserLoggedinId(this.username).subscribe(data => {
                this.router.navigate(['/home']);
              });
              
            }
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          this.showableErrorMsg = "User doesn't exist";
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = `Error while trying to login user ${
              this.user.value.username
            }: ${err.error.message}`;
          } else {
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.user.value.username
            }: ${err.error}`;
          }
        }
      );
  }
  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${
        errors.minlength.requiredLength
        } characters (got ${errors.minlength.actualLength})`;
    } else if (errors.userAlreadyExists) {
      return `user already exists`;
    } else if (errors.email) {
      return `not a valid email address`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
    } 
  }

}
