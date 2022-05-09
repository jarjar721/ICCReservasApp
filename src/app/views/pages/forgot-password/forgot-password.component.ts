import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ForgotPasswordDTO } from '../../../interfaces/forgot-password-DTO'
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgottenPasswordModel = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
  });
  public successMessage: string = "";
  public errorMessage: string = "";
  public showSuccess: boolean = false;
  public showError: boolean = false;
  
  constructor(
    public service: AuthenticationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.forgottenPasswordModel.reset();
  }

  onSubmit() {
    this.showError = this.showSuccess = false;
    this.spinner.show();
    
    this.service.forgotPassword(this.forgottenPasswordModel)
    .subscribe(_ => {
      this.spinner.hide();
      this.toastr.success('Revise su email para restaurar su contraseña', 'Enlace enviado');
    },
    err => {
      this.toastr.error(err.error.Message, '¡Ups!');
      //this.showError = true;
      //this.errorMessage = err;
    })
  }

}
