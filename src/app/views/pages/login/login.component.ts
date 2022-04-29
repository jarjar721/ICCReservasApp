import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared/user.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    public service: UserService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private toastr: ToastrService 
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/dashboard']);
    } else
    this.loginModel.reset();
  }

  onSubmit() { 
    this.spinner.show();

    this.service.login(this.loginModel).subscribe(
      (res:any) => {
        this.loginModel.reset();

        localStorage.setItem('token', res.token);
        localStorage.setItem('userID', res.responseUser.id);
        this.router.navigate(['/dashboard']);

        this.toastr.success('Login exitoso','¡Bienvenido!');

        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);
      },
      err => {
        
        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);

        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }
  
}
