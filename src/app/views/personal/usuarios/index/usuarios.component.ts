import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Usuario } from "../../../../models/usuario.model";

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  usuarios: Usuario[] = [];

  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    public service: UserService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getUserList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };
  }

  getUserList() {
    this.service.getAllUsers().subscribe(
      res => {
        this.usuarios = (res as any)
        console.log(this.usuarios);
        this.dtTrigger.next();
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          console.log(err);
        }
      }
    )
  }

  crearUser() {
    this.router.navigate(["/personal/create-usuario"]);
  }

  deleteUser(id: any) {
    this.service.deleteUser(id.toString()).subscribe(
      res => {
        this.toastr.success('El usuario ha sido eliminado exitosamente','Usuario eliminado');
        this.getUserList();
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
