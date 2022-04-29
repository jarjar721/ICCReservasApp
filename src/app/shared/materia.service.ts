import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllMaterias() {
    return this.http.get<Materia[]>(this.BaseURI+'Materias');
  }

}
