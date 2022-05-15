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
        title: "Hora #" + x.numero.toString(),
        startTime: x.horaInicio,
        endTime: x.horaFin
      })
    });
  }

  public eventClicked!: Horario;
  modalTitle!: string

  handleEventClick(arg: any) {
    console.log(arg)
    this.eventClicked = new Horario(arg.event.groupId, arg.event.id, this.nivel, arg.event.startStr, arg.event.endStr)
    console.log(this.eventClicked)
    
    this.modalTitle = "Hora #" + arg.event.id.toString();
    this.toggleLiveDemo()
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}
