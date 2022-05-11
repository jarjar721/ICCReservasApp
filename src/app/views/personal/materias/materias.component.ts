import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Materia } from 'src/app/models/materia.model';

import { MateriaService } from 'src/app/shared/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnDestroy, OnInit {
  
  dtOptions: DataTables.Settings = {};
  materias: Materia[] = [];

  dtTrigger: Subject<void> = new Subject<void>();

  constructor(public service: MateriaService) { }

  ngOnInit(): void {
    this.getMateriasList();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
      }
    };
  }

  getMateriasList() {
    this.service.getAllMaterias().subscribe(
      res => {
        this.materias = (res as any)
        console.log(this.materias);
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
