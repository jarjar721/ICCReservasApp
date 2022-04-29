import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { DataTablesModule } from "angular-datatables";

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
import { UsuariosComponent } from './usuarios/index/usuarios.component';
import { CreateUsuarioComponent } from './usuarios/create/create-usuario.component';

import { HorariosComponent } from './horarios/horarios.component';
import { MateriasComponent } from './materias/materias.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UsuariosComponent,
    CreateUsuarioComponent,
    HorariosComponent,
    MateriasComponent,
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
    FullCalendarModule, // register FullCalendar with you app
    DataTablesModule
  ]
})
export class PersonalModule { }
