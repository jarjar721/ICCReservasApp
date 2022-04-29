import { Component, OnInit } from '@angular/core';

import { CalendarApi, CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { HorarioService } from 'src/app/shared/horario.service';
import { Horario } from 'src/app/models/horario.model';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  horarios: Horario[] = [];
  horariosHigh: Horario[] = [];
  horariosMiddle: Horario[] = [];
  horariosUpperElementary: Horario[] = [];
  horariosLowerElementary: Horario[] = [];

  eventsLE = []
  eventsUE: Array<any> = []
  eventsMS: Array<any> = []
  eventsHS: Array<any> = []

  calendarLowerElementaryOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'Editar'
    },
    customButtons: {
      Editar: {
        text: 'Editar',
        click: function() {
          alert('clicked Editar Lower Elementary button!');
        }
      }
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    allDaySlot: false,
    weekends: false,
    nowIndicator: true,
    slotMinTime: '08:30:00',
    slotMaxTime: '15:00:00',
    expandRows: true,
    slotLabelInterval: '00:30'
  };

  calendarUpperElementaryOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'Editar'
    },
    customButtons: {
      Editar: {
        text: 'Editar',
        click: function() {
          alert('clicked Editar Upper Elementary button!');
        }
      }
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    allDaySlot: false,
    weekends: false,
    nowIndicator: true,
    slotMinTime: '08:30:00',
    slotMaxTime: '15:00:00',
    expandRows: true,
    slotLabelInterval: '00:30'
  };

  calendarMiddleOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'Editar'
    },
    customButtons: {
      Editar: {
        text: 'Editar',
        click: function() {
          alert('clicked Editar Middle School button!');
        }
      }
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    allDaySlot: false,
    weekends: false,
    nowIndicator: true,
    slotMinTime: '08:00:00',
    slotMaxTime: '14:30:00',
    expandRows: true,
    slotLabelInterval: '00:30'
  };

  calendarHighOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ timeGridPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'Editar'
    },
    customButtons: {
      Editar: {
        text: 'Editar',
        click: function() {
          alert('clicked Editar High School button!');
        }
      }
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    allDaySlot: false,
    weekends: false,
    nowIndicator: true,
    slotMinTime: '07:30:00',
    slotMaxTime: '14:30:00',
    expandRows: true,
    slotLabelInterval: '00:30'
  };

  constructor(public service: HorarioService) { }

  ngOnInit(): void {
    this.getHorariosList();
  }

  getHorariosList() {
    this.service.getAllHorarios().subscribe(
      res => {
        this.horarios = (res as any)
        console.log(this.horarios);
        this.sortHorariosByNivel(this.horarios);
        this.setCalendarEvents(this.eventsLE, this.horariosLowerElementary);
        console.log(this.eventsLE);
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          console.log(err);
        }
      }
    )
  }

  sortHorariosByNivel(horarios: Horario[]) {
    this.horariosHigh = horarios.filter(data => {
      return data.nivel == "HS";
    });

    this.horariosMiddle = horarios.filter(data => {
      return data.nivel == "MS";
    });

    this.horariosUpperElementary = horarios.filter(data => {
      return data.nivel == "UE";
    });

    this.horariosLowerElementary = horarios.filter(data => {
      return data.nivel == "LE";
    });
  }

  setCalendarEvents(events: any, horarios: Horario[]) {
    horarios.forEach(x => {
      events.push({
        title: x.numero.toString(),
        startTime: x.horaInicio,
        endTime: x.horaFin
      })
    });
    
  }

  getLowerElementaryEvents() {
    
  }

}
