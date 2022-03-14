import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  calendarElementaryOptions: CalendarOptions = {
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
          alert('clicked Editar Elementary button!');
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

  constructor() { }

  ngOnInit(): void {

  }

}
