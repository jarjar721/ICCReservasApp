import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosComponent } from './horarios/horarios.component';
import { MateriasComponent } from './materias/materias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Personal',
    },
    children: [
      {
        path: '',
        redirectTo: 'usuarios',
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Usuarios',
        },
      },
      {
        path: 'horarios',
        component: HorariosComponent,
        data: {
          title: 'Horarios',
        },
      },
      {
        path: 'materias',
        component: MateriasComponent,
        data: {
          title: 'Materias',
        },
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
