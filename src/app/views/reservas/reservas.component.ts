import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  calendarReservasOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    locale: esLocale,
    selectable: true,
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
          //window.location.href = 'http://localhost:4200/#/reservas/crear'
        }
      }
    },

    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    },
    slotMinTime: '07:30:00',
    slotMaxTime: '14:30:00',
    slotLabelInterval: '00:30',
    allDaySlot: false,

    weekends: false,
    expandRows: true,
    nowIndicator: true,
    
    dateClick: function(info) {
      alert('clicked ' + info.dateStr);
    },
    
  };

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  navigateToCreateReserva() {
    this.router.navigate(['reservas/calendario']);
  }

}
