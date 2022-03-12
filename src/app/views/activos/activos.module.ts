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

import { ActivosRoutingModule } from './activos-routing.module';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';


@NgModule({
  declarations: [
    DispositivosComponent,
    InstalacionesComponent
  ],
  imports: [
    CommonModule,
    ActivosRoutingModule,
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
export class ActivosModule { }
