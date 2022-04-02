import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

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

  constructor(public service: UserService, private formBuilder: FormBuilder) { }

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
    this.service.unlockAccount(this.accountUnlockModel).subscribe(
      (res:any) => {
        if (res.succeeded) {
          this.accountUnlockModel.reset();
        } else {
          res.errors.forEach((element: { code: any; }) => {
            switch (element.code) {
              case 'value':
                
                break;
            
              default:
                //Falló
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}