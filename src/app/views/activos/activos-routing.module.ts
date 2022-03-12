import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Activos',
    },
    children: [
      {
        path: '',
        redirectTo: 'dispositivos',
      },
      {
        path: 'dispositivos',
        component: DispositivosComponent,
        data: {
          title: 'Dispositivos',
        },
      },
      {
        path: 'instalaciones',
        component: InstalacionesComponent,
        data: {
          title: 'Instalaciones',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivosRoutingModule { }
