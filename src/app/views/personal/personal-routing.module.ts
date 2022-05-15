import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosComponent } from './horarios/index/horarios.component';
import { MateriasComponent } from './materias/materias.component';
import { UsuariosComponent } from './usuarios/index/usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create/create-usuario.component';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { EditHorarioComponent } from './horarios/edit-horario/edit-horario.component';

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
        path: 'usuarios/edit-usuario/:id',
        component: EditUsuarioComponent,
        data: {
          title: 'Editar Usuario',
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
        path: 'horarios/edit-horario/:nivel',
        component: EditHorarioComponent,
        data: {
          title: 'Editar Horario',
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
