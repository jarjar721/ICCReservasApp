import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dispositivo } from '../models/dispositivo.model';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllDispositivos() {
    return this.http.get<Dispositivo[]>(this.BaseURI+'Dispositivos');
  }

}
