import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  // Register preregistered account
  unlockAccount(accountUnlockModel: FormGroup) {
    var body = {
      Email: accountUnlockModel.value.Email,
      Password: accountUnlockModel.value.Password
    };
    return this.http.post(this.BaseURI + 'Authentication/AccountUnlock', body)
  }

  login(loginModel: FormGroup) {
    var body = {
      Email: loginModel.value.Email,
      Password: loginModel.value.Password
    };
    return this.http.post(this.BaseURI + 'Authentication/UserLogin', body)
  }

  getUserDetails(userID: string) {
    return this.http.get(this.BaseURI+'Usuarios/User/'+userID);
  }

  getAllUsers() {
    return this.http.get<Usuario[]>(this.BaseURI+'Usuarios');
  }

}