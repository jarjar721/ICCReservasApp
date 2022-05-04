import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

import { ForgotPasswordDTO } from '../interfaces/forgot-password-DTO'
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly BaseURI = 'https://localhost:7006/api/';

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  // Register preregistered account
  unlockAccount(accountUnlockModel: FormGroup) {
    var body = {
      Email: accountUnlockModel.value.Email,
      Password: accountUnlockModel.value.Password
    };
    return this._http.post(this.BaseURI + 'Authentication/AccountUnlock', body)
  }

  login(loginModel: FormGroup) {
    var body = {
      Email: loginModel.value.Email,
      Password: loginModel.value.Password
    };
    return this._http.post(this.BaseURI + 'Authentication/UserLogin', body)
  }

  forgotPassword(forgottenPasswordModel: FormGroup) {
    const body: ForgotPasswordDTO = {
      email: forgottenPasswordModel.value.Email,
      clientURI: 'http://localhost:4200/authentication/resetpassword'
    }
    return this._http.post(this.createCompleteRoute('Authentication/ForgotPassword', this._envUrl.urlAddress), body);
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

}
