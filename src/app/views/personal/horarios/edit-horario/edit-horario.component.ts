import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { ToastrService } from 'ngx-toastr';

import { Horario } from 'src/app/models/horario.model';
import { HorarioService } from 'src/app/shared/horario.service';

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

  id!: string;
  nombre!: string;
  startTime!: Date;
  endTime!: Date;

  editHorarioModel!: {
    Id: string,
    Nivel: string,
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
    this.loadHorarioByNivel(this.nivel);
  }

  loadHorarioByNivel(nivel: any) {
    this.service.getHorarioByNivel(nivel).subscribe(
      res => {
        this.horarios = (res as any)
        console.log(this.horarios)

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
        id: x.id.toString(),
        title: x.nombre,
        startTime: x.horaInicio,
        endTime: x.horaFin
      })
    });
  }

  public eventClicked!: Horario;

  handleEventClick(arg: any) {
    console.log(arg)

    this.id = arg.event.id;
    this.nombre = arg.event.title;
    var startDate = new Date(arg.event.startStr);
    var endDate = new Date(arg.event.endStr);
    this.startTime = startDate;
    this.endTime = endDate;

    this.eventClicked = new Horario(
      arg.event.groupId, 
      this.nivel,
      arg.event.title, 
      startDate.getHours().toString()+":"+startDate.getMinutes().toString()+":00", 
      endDate.getHours().toString()+":"+endDate.getMinutes().toString()+":00"
      )
    console.log(this.eventClicked)

    this.editHorarioModel = {
      Id: this.eventClicked.id.toString(),
      Nivel: this.eventClicked.nivel,
      Nombre: this.eventClicked.nombre,
      HoraInicio: this.eventClicked.horaInicio,
      HoraFin: this.eventClicked.horaFin
    };
    
    this.toggleEditModal()
  }

  public visibleCreateModal = false;
  public visibleEditModal = false;

  toggleCreateModal() {
    this.visibleCreateModal = !this.visibleCreateModal;
  }

  toggleEditModal() {
    this.visibleEditModal = !this.visibleEditModal;
  }

  handleCreateModalChange(event: any) {
    this.visibleCreateModal = event;
  }

  handleEditModalChange(event: any) {
    this.visibleEditModal = event;
  }

  padNumber(time: string) {
    if(time.length > 1)
      return time
    else
      return "0"+time;
  }

  onSubmitCreate() {
    var createHorarioModel = {
      Nivel: this.nivel,
      Nombre: this.nombre,
      HoraInicio: this.padNumber(this.startTime.getHours().toString())+":"+this.padNumber(this.startTime.getMinutes().toString())+":00",
      HoraFin: this.padNumber(this.endTime.getHours().toString())+":"+this.padNumber(this.endTime.getMinutes().toString())+":00"
    };
    console.log(createHorarioModel);

    this.service.createHorario(createHorarioModel).subscribe(
      res => {
        this.toggleCreateModal();
        this.toastr.success('La hora se ha agregado exitosamente','Hora creada');
        this.loadHorarioByNivel(this.nivel);
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  onSubmitEdit() {
    this.editHorarioModel = {
      Id: this.eventClicked.id.toString(),
      Nivel: this.eventClicked.nivel,
      Nombre: this.nombre,
      HoraInicio: this.padNumber(this.startTime.getHours().toString())+":"+this.padNumber(this.startTime.getMinutes().toString())+":00",
      HoraFin: this.padNumber(this.endTime.getHours().toString())+":"+this.padNumber(this.endTime.getMinutes().toString())+":00"
    };
    console.log(this.editHorarioModel);
    
    this.service.editHorario(this.eventClicked.id.toString(), this.editHorarioModel).subscribe(
      res => {
        this.toggleEditModal();
        this.toastr.success('La hora se ha modificado exitosamente','Hora modificada');
        this.loadHorarioByNivel(this.nivel);
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  deleteHora(id: string) {
    this.service.deleteHorario(id.toString()).subscribe(
      res => {
        this.toggleEditModal();
        this.toastr.success('La hora se ha eliminado exitosamente','Hora eliminada');
        this.loadHorarioByNivel(this.nivel);
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

}
