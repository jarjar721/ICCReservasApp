import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

// ngx-select-dropdown
import { SelectDropDownModule } from 'ngx-select-dropdown'
// ng2-date-picker
import { DpDatePickerModule } from 'ng2-date-picker';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasComponent } from './calendario/reservas.component';
import { CrearReservaComponent } from './crear-reserva/crear-reserva.component'

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    ReservasComponent,
    CrearReservaComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    FormModule,
    FormsModule,
    GridModule,
    IconModule,
    NavModule,
    ProgressModule,
    ReactiveFormsModule,
    TableModule,
    TabsModule,
    
    FullCalendarModule, // register FullCalendar with you app
    SelectDropDownModule,
    DpDatePickerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReservasModule { }
