import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  TableModule
} from '@coreui/angular';

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
    PersonalRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FormModule,
    GridModule,
    ListGroupModule,
    SharedModule,
    TableModule
  ]
})
export class PersonalModule { }
