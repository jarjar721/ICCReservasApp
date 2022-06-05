import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  editUserModel!: FormGroup;
  id!: String;
  user!: Usuario;

  statuses: Array<any> = [
    {id: 1, name: "Habilitado"},
    {id: 0, name: "Deshabilitado"}
  ];

  constructor(
    public service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.service.getUserDetails(this.id).subscribe(
      res => {
        this.user = (res as any)
        console.log(this.user);

        this.editUserModel = new FormGroup({
          Names: new FormControl(['', Validators.required]),
          LastNames: new FormControl(['', Validators.required]),
          Email: new FormControl(['', [Validators.required, Validators.email]]),
          UserName: new FormControl(['', Validators.required]),
          Status: new FormControl(['', Validators.required])
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.service.editUser(this.id, this.editUserModel).subscribe(
      res => {
        this.router.navigate(['/personal/usuarios']);

        this.toastr.success('El usuario se ha modificado exitosamente','Usuario modificado');
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  onReset() {
    this.router.navigate(['/activos/instalaciones'])
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.editUserModel.value.Status = event.target.value;
  }

}
