import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosComponent } from './horarios/index/horarios.component';
import { MateriasComponent } from './materias/materias.component';
import { UsuariosComponent } from './usuarios/index/usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create/create-usuario.component';

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
        path: 'create-usuario',
        component: CreateUsuarioComponent,
        data: {
          title: 'Create Usuario',
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
