import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
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
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule
  ]
})
export class PersonalModule { }
