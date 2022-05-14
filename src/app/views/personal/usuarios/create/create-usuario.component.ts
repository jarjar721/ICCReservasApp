import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit {

  createUserModel = this.formBuilder.group({
    Names: ['', Validators.required],
    LastNames: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    UserName: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    public service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createUserModel.reset();
  }

  onSubmit() {
    this.service.createUser(this.createUserModel).subscribe(
      res => {
        this.createUserModel.reset();
        this.router.navigate(['/personal/usuarios']);

        this.toastr.success('El usuario se ha creado exitosamente','Usuario creado');
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  onReset() {
    this.router.navigate(['/personal/usuarios']);
    this.createUserModel.reset();
  }

}
