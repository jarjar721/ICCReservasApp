import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllHorarios() {
    return this.http.get<Horario[]>(this.BaseURI+'Horarios');
  }
  
}
