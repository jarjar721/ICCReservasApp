import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Dispositivo } from 'src/app/models/dispositivo.model';

import { DispositivoService } from 'src/app/shared/dispositivo.service';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.scss']
})
export class DispositivosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dispositivos: Dispositivo[] = [];

  dtTrigger: Subject<void> = new Subject<void>();

  constructor(private router: Router, public service: DispositivoService) { }

  ngOnInit(): void {
    this.getDispositivosList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };
  }

  getDispositivosList() {
    this.service.getAllDispositivos().subscribe(
      res => {
        this.dispositivos = (res as any)
        console.log(this.dispositivos);
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

  crearDispositivo() {
    this.router.navigate(["/activos/crear-dispositivo"]);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
