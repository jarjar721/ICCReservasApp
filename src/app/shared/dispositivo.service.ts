import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dispositivo } from '../models/dispositivo.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllDispositivos() {
    return this._http.get<Dispositivo[]>(this.BaseURI+'Dispositivos');
  }

  getDispositivoDetails(id: String) {
    return this._http.get(this.BaseURI+'Dispositivos/Details/'+id);
  }

  createDispositivo(createDispositivoModel: FormGroup) {
    const body = {
      Marca: createDispositivoModel.value.Marca,
      Modelo: createDispositivoModel.value.Modelo,
      Tipo: createDispositivoModel.value.Tipo,
      Serial: createDispositivoModel.value.Serial,
      Uso: createDispositivoModel.value.Uso,
      Ubicacion: createDispositivoModel.value.Ubicacion,
      Observacion: createDispositivoModel.value.Observacion,
      Status: 1
    };
    return this._http.post(this.BaseURI + 'Dispositivos/Create', body)
  }

  editDispositivo(id: String, editDispositivoModel: FormGroup) {
    const body = {
      Id: id,
      Marca: editDispositivoModel.value.Marca,
      Modelo: editDispositivoModel.value.Modelo,
      Tipo: editDispositivoModel.value.Tipo,
      Serial: editDispositivoModel.value.Serial,
      Uso: editDispositivoModel.value.Uso,
      Ubicacion: editDispositivoModel.value.Ubicacion,
      Observacion: editDispositivoModel.value.Observacion,
      Status: editDispositivoModel.value.Status
    };
    return this._http.put(this.BaseURI + 'Dispositivos/Edit/'+id, body);
  }

  deleteDispositivo(id: String) {
    return this._http.delete(this.BaseURI + 'Dispositivos/Delete/'+id);
  }

}
