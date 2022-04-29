import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared/user.service';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  accountUnlockModel = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(3)]],
    ConfirmPassword: ['', Validators.required]
  },{
    validator: this.comparePasswords
  });

  constructor(
    public service: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');

    if (confirmPasswordCtrl?.errors == null || 'passwordMismatch' in confirmPasswordCtrl?.errors) {
      if (fb.get('Password')?.value != confirmPasswordCtrl?.value)
        confirmPasswordCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl?.setErrors(null);
    } 

  }

  ngOnInit() {
    this.accountUnlockModel.reset();
  }

  onSubmit() {
    this.spinner.show();

    this.service.unlockAccount(this.accountUnlockModel).subscribe(
      res => {
        this.accountUnlockModel.reset();
        this.router.navigate(['/login']);

        this.toastr.success('Registro exitoso','Usuario desbloqueado!');

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);
      },
      err => {
        
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2000);

        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

}