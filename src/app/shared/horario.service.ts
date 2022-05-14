import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private _http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllHorarios() {
    return this._http.get<Horario[]>(this.BaseURI+'Horarios');
  }

  getHorarioDetails(id: String) {
    return this._http.get(this.BaseURI+'Horarios/Details/'+id);
  }

  createHorario(createHorarioModel: FormGroup) {
    const body = {
      Numero: createHorarioModel.value.Numero,
      Nivel: createHorarioModel.value.Nivel,
      HoraInicio: createHorarioModel.value.HoraInicio,
      HoraFin: createHorarioModel.value.HoraFin
    };
    return this._http.post(this.BaseURI + 'Horarios/Create', body)
  }

  editHorario(id: String, editHorarioModel: FormGroup) {
    const body = {
      Id: id,
      Numero: editHorarioModel.value.Numero,
      Nivel: editHorarioModel.value.Nivel,
      HoraInicio: editHorarioModel.value.HoraInicio,
      HoraFin: editHorarioModel.value.HoraFin
    };
    return this._http.put(this.BaseURI + 'Horarios/Edit/'+id, body);
  }

  deleteHorario(id: String) {
    return this._http.delete(this.BaseURI + 'Horarios/Delete/'+id);
  }
  
}
