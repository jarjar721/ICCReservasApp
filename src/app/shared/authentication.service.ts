import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

import { ForgotPasswordDTO } from '../interfaces/forgot-password-DTO'
import { ResetPasswordDTO } from '../interfaces/reset-password-DTO'
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly BaseURI = 'https://localhost:7006/api/';

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  // Register preregistered account
  unlockAccount(accountUnlockModel: FormGroup) {
    const body = {
      Email: accountUnlockModel.value.Email,
      Password: accountUnlockModel.value.Password
    };
    return this._http.post(this.BaseURI + 'Authentication/AccountUnlock', body)
  }

  login(loginModel: FormGroup) {
    const body = {
      Email: loginModel.value.Email,
      Password: loginModel.value.Password
    };
    return this._http.post(this.BaseURI + 'Authentication/UserLogin', body)
  }

  forgotPassword(forgottenPasswordModel: FormGroup) {
    const body: ForgotPasswordDTO = {
      email: forgottenPasswordModel.value.Email,
      clientURI: 'http://localhost:4200/reset-password/'
    }
    return this._http.post(this.BaseURI + 'Authentication/ForgotPassword', body);
  }

  public resetPassword(body: ResetPasswordDTO) {
    return this._http.post(this.BaseURI + 'Authentication/ResetPassword', body);
  }

}
