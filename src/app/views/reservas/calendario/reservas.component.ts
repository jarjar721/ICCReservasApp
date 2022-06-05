import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';

import { ReservaService } from 'src/app/shared/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  reservas: Reserva[] = [];
  events: Array<any> = []

  calendarReservasOptions: CalendarOptions = {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    locale: esLocale,
    selectable: true,
    initialView: 'timeGridWeek',
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek',
      center: 'title',
      end: 'today,prev,next'
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

  constructor(public router: Router, public service: ReservaService) { }

  ngOnInit(): void {
    this.getAllReservas();
  }

  agendarReserva() {
    this.router.navigate(['/reservas/crear']);
  }

  getAllReservas() {
    this.service.getAllReservas().subscribe(
      res => {
        this.reservas = (res as any)

        this.setCalendarEvents(this.events, this.reservas);

        this.calendarReservasOptions.events = this.events;

        console.log(this.reservas);
        console.log(this.events);
      },
      err => {
        console.log(err);
        if (err.status == 400) {
          console.log(err);
        }
      }
    )
  }

  setCalendarEvents(events: any, reservas: Reserva[]) {
    reservas.forEach(x => {
      events.push({
        id: x.id.toString(),
        title: x.titulo,
        start: new Date(x.datetimeInicialReservacion),
        end: new Date(x.datetimeFinalReservacion)
      })
    });
  }

}
