import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReservaDTO } from '../interfaces/create-reserva-DTO';

import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private _http: HttpClient) { }
  readonly BaseURI = 'https://localhost:7006/api/';

  getAllReservas() {
    return this._http.get<Reserva[]>(this.BaseURI+'Reservas');
  }

  getReservasInRange(startDatetime: Date, endDatetime: Date) {
    const body = {
      startDatetime: startDatetime,
      endDatetime: endDatetime
    }
    return this._http.post<Reserva[]>(this.BaseURI+'Reservas/ReservasInRange', body);
  }

  createReserva(body: CreateReservaDTO) {
    return this._http.post(this.BaseURI + 'Reservas/Create', body)
  }

}
