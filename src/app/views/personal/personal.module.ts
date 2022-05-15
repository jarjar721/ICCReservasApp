import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { DataTablesModule } from "angular-datatables";
import { TimepickerModule} from 'ngx-bootstrap/timepicker';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { PersonalRoutingModule } from './personal-routing.module';

import { UsuariosComponent } from './usuarios/index/usuarios.component';
import { HorariosComponent } from './horarios/index/horarios.component';
import { MateriasComponent } from './materias/materias.component';

import { CreateUsuarioComponent } from './usuarios/create/create-usuario.component';

import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { EditHorarioComponent } from './horarios/edit-horario/edit-horario.component';

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
    EditUsuarioComponent,
    EditHorarioComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    FormsModule, 
    ReactiveFormsModule,
    GridModule,
    IconModule,
    ModalModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    FullCalendarModule, // register FullCalendar with you app
    DataTablesModule,
    TimepickerModule.forRoot()
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PersonalModule { }
