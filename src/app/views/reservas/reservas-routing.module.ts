import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservasComponent } from './calendario/reservas.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reservas',
    },
    children: [
      {
        path: '',
        redirectTo: 'calendario',
      },
      {
        path: 'calendario',
        component: ReservasComponent,
        data: {
          title: 'Calendario',
        },
      },
      {
        path: 'crear',
        component: CrearReservaComponent,
        data: {
          title: 'Reservar',
        },
      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
