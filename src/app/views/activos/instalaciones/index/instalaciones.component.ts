import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { Instalacion } from 'src/app/models/instalacion.model';

import { InstalacionService } from 'src/app/shared/instalacion.service';

@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.scss']
})
export class InstalacionesComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  instalaciones: Instalacion[] = [];

  dtTrigger: Subject<void> = new Subject<void>();

  constructor(
    public service: InstalacionService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getInstalacionesList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };
  }

  getInstalacionesList() {
    this.service.getAllInstalaciones().subscribe(
      res => {
        this.instalaciones = (res as any)
        console.log(this.instalaciones);
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

  crearInstalacion() {
    this.router.navigate(["/activos/crear-instalacion"]);
  }

  deleteInstalacion(id: any) {
    this.service.deleteInstalacion(id.toString()).subscribe(
      res => {
        this.toastr.success('La instalación ha sido eliminada exitosamente','Instalación eliminada');
        this.getInstalacionesList();
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
