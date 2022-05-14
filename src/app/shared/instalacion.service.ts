import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Instalacion } from '../models/instalacion.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  constructor(private _http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllInstalaciones() {
    return this._http.get<Instalacion[]>(this.BaseURI+'Instalaciones');
  }

  getInstalacionDetails(id: String) {
    return this._http.get(this.BaseURI+'Instalaciones/Details/'+id);
  }

  createInstalacion(createInstalacionModel: FormGroup) {
    const body = {
      Codigo: createInstalacionModel.value.Codigo,
      Nombre: createInstalacionModel.value.Nombre,
      Tipo: createInstalacionModel.value.Tipo,
      Capacidad: createInstalacionModel.value.Capacidad,
      Edificio: createInstalacionModel.value.Edificio,
      Piso: createInstalacionModel.value.Piso,
      Descripcion: createInstalacionModel.value.Descripcion,
      Status: 1
    };
    return this._http.post(this.BaseURI + 'Instalaciones/Create', body)
  }

  editInstalacion(id: String, editInstalacionModel: FormGroup) {
    const body = {
      Id: id,
      Codigo: editInstalacionModel.value.Codigo,
      Nombre: editInstalacionModel.value.Nombre,
      Tipo: editInstalacionModel.value.Tipo,
      Capacidad: editInstalacionModel.value.Capacidad,
      Edificio: editInstalacionModel.value.Edificio,
      Piso: editInstalacionModel.value.Piso,
      Descripcion: editInstalacionModel.value.Descripcion,
      Status: editInstalacionModel.value.Status
    };
    console.log(body);
    return this._http.put(this.BaseURI + 'Instalaciones/Edit/'+id, body);
  }

  deleteInstalacion(id: String) {
    return this._http.delete(this.BaseURI + 'Instalaciones/Delete/'+id);
  }
  
}
