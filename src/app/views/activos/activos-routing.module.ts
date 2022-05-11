import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearDispositivosComponent } from './crear-dispositivos/crear-dispositivos.component';
import { CrearInstalacionComponent } from './crear-instalacion/crear-instalacion.component';

import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { InstalacionesComponent } from './instalaciones/index/instalaciones.component';

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
        path: 'crear-dispositivo',
        component: CrearDispositivosComponent,
        data: {
          title: 'Crear Dispositivo',
        },
      },
      {
        path: 'instalaciones',
        component: InstalacionesComponent,
        data: {
          title: 'Instalaciones',
        },
      },
      {
        path: 'crear-instalacion',
        component: CrearInstalacionComponent,
        data: {
          title: 'Crear Instalación',
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
