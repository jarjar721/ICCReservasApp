import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { ToastrService } from 'ngx-toastr';

import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/shared/horario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.scss']
})
export class EditHorarioComponent implements OnInit {

  nivel!: string;
  nivelTitle!: string;

  horarios: Horario[] = [];
  events: Array<any> = [];

  nombre!: string;
  startTime!: Date;
  endTime!: Date;

  editHorarioModel!: {
    Id: string,
    Nivel: string,
    Numero: number,
    Nombre: string,
    HoraInicio: string,
    HoraFin: string
  };

  calendarOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ timeGridPlugin, interactionPlugin ],
    editable: true,
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'title',
      center: ''
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      meridiem: 'short'
    },
    allDaySlot: false,
    weekends: false,
    nowIndicator: true,
    slotMinTime: '07:30:00',
    slotMaxTime: '17:00:00',
    expandRows: true,
    slotLabelInterval: '00:30',
    eventResizableFromStart: true,
    eventOverlap: false,
    eventClick: this.handleEventClick.bind(this), // bind is important!
  };

  constructor(
    public service: HorarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.nivel = this.route.snapshot.params['nivel'];
    this.setCalendarTitle(this.nivel);

    this.service.getHorarioByNivel(this.nivel).subscribe(
      res => {
        this.horarios = (res as any)

        this.setCalendarEvents(this.events, this.horarios);

        this.calendarOptions.events = this.events;
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          console.log(err);
        }
      }
    )
  }

  setCalendarTitle(nivel: String) {
    if (nivel == "HS")
      this.nivelTitle = "Horario de High School"
    if (nivel == "MS")
      this.nivelTitle = "Horario de Middle School"
    if (nivel == "UE")
      this.nivelTitle = "Horario de Upper Elementary"
     if (nivel == "LE")
      this.nivelTitle = "Horario de Lower Elementary"
  }

  setCalendarEvents(events: any, horarios: Horario[]) {
    horarios.forEach(x => {
      events.push({
        groupId: x.id.toString(),
        id: x.numero.toString(),
        title: x.nombre,
        startTime: x.horaInicio,
        endTime: x.horaFin
      })
    });
  }

  public eventClicked!: Horario;

  handleEventClick(arg: any) {
    console.log(arg)

    this.nombre = arg.event.title;
    var startDate = new Date(arg.event.startStr);
    var endDate = new Date(arg.event.endStr);
    this.startTime = startDate;
    this.endTime = endDate;

    this.eventClicked = new Horario(
      arg.event.groupId, 
      arg.event.id, 
      this.nivel,
      arg.event.title, 
      startDate.getHours().toString()+":"+startDate.getMinutes().toString()+":00", 
      endDate.getHours().toString()+":"+endDate.getMinutes().toString()+":00"
      )
    console.log(this.eventClicked)

    this.editHorarioModel = {
      Id: this.eventClicked.id.toString(),
      Nivel: this.eventClicked.nivel,
      Numero: this.eventClicked.numero,
      Nombre: this.eventClicked.nombre,
      HoraInicio: this.eventClicked.horaInicio,
      HoraFin: this.eventClicked.horaFin
    };
    
    this.toggleLiveDemo()
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  onSubmit() {
    this.editHorarioModel = {
      Id: this.eventClicked.id.toString(),
      Nivel: this.eventClicked.nivel,
      Numero: this.eventClicked.numero, //REVISAR ESTO
      Nombre: this.nombre,
      HoraInicio: this.startTime.getHours()+":"+this.startTime.getMinutes()+":00",
      HoraFin: this.endTime.getHours()+":"+this.endTime.getMinutes()+":00"
    };
    console.log(this.editHorarioModel);
    /*
    this.service.editHorario(this.eventClicked.id.toString(), this.editHorarioModel).subscribe(
      res => {
        this.toastr.success('La hora se ha modificado exitosamente','Hora modificada');
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
    */
  }

}
