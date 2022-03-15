import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  calendarReservasOptions: CalendarOptions = {
    locale: esLocale,
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
      center: 'title',
      end: 'Agregar today,prev,next'
    },
    customButtons: {
      Agregar: {
        text: 'Agregar',
        click: function() {
          alert('clicked Agregar Reserva button!');
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
