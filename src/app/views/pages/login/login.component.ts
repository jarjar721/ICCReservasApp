import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(public service: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    } else
    this.loginModel.reset();
  }

  onSubmit() { 
    this.service.login(this.loginModel).subscribe(
      (res:any) => {
        console.log(res);
        this.loginModel.reset();
        localStorage.setItem('token', res.token);
        localStorage.setItem('user.userID', res.user.userID);
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          console.log(err);
        }
      }
    )
  }
  
}
