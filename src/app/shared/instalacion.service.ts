import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Instalacion } from '../models/instalacion.model';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllInstalaciones() {
    return this.http.get<Instalacion[]>(this.BaseURI+'Instalaciones');
  }
}
