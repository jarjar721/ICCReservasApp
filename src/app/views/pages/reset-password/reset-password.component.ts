import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordDTO } from 'src/app/interfaces/reset-password-DTO';

import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordModel = this.formBuilder.group({
    NewPassword: ['', [Validators.required, Validators.minLength(3)]],
    ConfirmNewPassword: ['', Validators.required]
  },{
    validator: this.comparePasswords
  });

  private _token: string = "";
  private _email: string = "";
  
  constructor(
    public service: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetPasswordModel.reset();
    this._token = this._route.snapshot.queryParams['token'];
    this._email = this._route.snapshot.queryParams['email'];
  }

  comparePasswords(fb: FormGroup) {
    let confirmPasswordCtrl = fb.get('ConfirmPassword');

    if (confirmPasswordCtrl?.errors == null || 'passwordMismatch' in confirmPasswordCtrl?.errors) {
      if (fb.get('Password')?.value != confirmPasswordCtrl?.value)
        confirmPasswordCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPasswordCtrl?.setErrors(null);
    } 

  }

  onSubmit() {
    const resetPasswordDTO: ResetPasswordDTO = {
      password: this.resetPasswordModel.value.NewPassword,
      confirmPassword: this.resetPasswordModel.value.ConfirmNewPassword,
      token: this._token,
      email: this._email
    }
    this.spinner.show();

    this.service.resetPassword(resetPasswordDTO)
    .subscribe(_ => {
      this.spinner.hide();
      this.toastr.success('Se ha reseteado tu contraseña exitosamente', 'Cambio de password exitoso');
      this.router.navigate(['/login']);
    },
    err => {
      this.toastr.error(err.error.Message, '¡Ups!');
      //this.showError = true;
      //this.errorMessage = error;
    })
  }

}
