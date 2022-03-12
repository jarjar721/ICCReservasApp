import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HorariosComponent } from './horarios/horarios.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    HorariosComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule
  ]
})
export class PersonalModule { }
