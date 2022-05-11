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

  deleteInstalacion(id: String) {
    return this._http.delete(this.BaseURI + 'Instalaciones/Delete/'+`${id}`);
  }
  
}
