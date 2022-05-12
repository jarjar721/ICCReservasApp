import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURI = 'https://localhost:7006/api/';

  constructor(private _http: HttpClient) { }

  getUserDetails(id: String) {
    return this._http.get(this.BaseURI+'Usuarios/Details/'+id);
  }

  getAllUsers() {
    return this._http.get<Usuario[]>(this.BaseURI+'Usuarios');
  }

  createUser(createDispositivoModel: FormGroup) {
    const body = {
      Names: createDispositivoModel.value.Names,
      LastNames: createDispositivoModel.value.LastNames,
      Email: createDispositivoModel.value.Email,
      UserName: createDispositivoModel.value.UserName
    };
    return this._http.post(this.BaseURI + 'Usuarios/Create', body)
  }

  deleteUser(id: String) {
    return this._http.delete(this.BaseURI + 'Usuarios/Delete/'+id);
  }

}
