import { NgModule } from '@angular/core';
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
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { CrearDispositivosComponent } from './crear-dispositivos/crear-dispositivos.component';
import { CrearInstalacionComponent } from './crear-instalacion/crear-instalacion.component';


@NgModule({
  declarations: [
    DispositivosComponent,
    InstalacionesComponent,
    CrearDispositivosComponent,
    CrearInstalacionComponent
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
  ]
})
export class ActivosModule { }
