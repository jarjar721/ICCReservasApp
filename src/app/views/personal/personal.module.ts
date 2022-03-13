import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    TabsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class PersonalModule { }
