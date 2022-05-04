import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURI = 'https://localhost:7006/api/';

  constructor(private http: HttpClient) { }

  getUserDetails(userID: string) {
    return this.http.get(this.BaseURI+'Usuarios/User/'+userID);
  }

  getAllUsers() {
    return this.http.get<Usuario[]>(this.BaseURI+'Usuarios');
  }

}
