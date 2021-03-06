import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from "angular-datatables";

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  TableModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

import { ActivosRoutingModule } from './activos-routing.module';

import { DispositivosComponent } from './dispositivos/index/dispositivos.component';
import { InstalacionesComponent } from './instalaciones/index/instalaciones.component';

import { CrearDispositivosComponent } from './dispositivos/crear-dispositivos/crear-dispositivos.component';
import { CrearInstalacionComponent } from './instalaciones/crear-instalacion/crear-instalacion.component';

import { EditInstalacionComponent } from './instalaciones/edit-instalacion/edit-instalacion.component';
import { EditDispositivoComponent } from './dispositivos/edit-dispositivo/edit-dispositivo.component';


@NgModule({
  declarations: [
    DispositivosComponent,
    InstalacionesComponent,
    CrearDispositivosComponent,
    CrearInstalacionComponent,
    EditInstalacionComponent,
    EditDispositivoComponent
  ],
  imports: [
    CommonModule,
    ActivosRoutingModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    DropdownModule,
    FormModule,
    FormsModule, 
    ReactiveFormsModule,
    GridModule,
    IconModule,
    ListGroupModule,
    SharedModule,
    TableModule,
    DataTablesModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ActivosModule { }
