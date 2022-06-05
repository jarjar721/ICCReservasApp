import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Instalacion } from 'src/app/models/instalacion.model';
import { Usuario } from 'src/app/models/usuario.model';

import { InstalacionService } from 'src/app/shared/instalacion.service';
import { UserService } from 'src/app/shared/user.service';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';

import { DispositivoService } from 'src/app/shared/dispositivo.service';
import { ReservaService } from 'src/app/shared/reserva.service';

import { DispositivosTypeAmount } from 'src/app/models/dispositivos-type-amount.model';
import { Reserva } from 'src/app/models/reserva.model';

import * as dayjs from 'dayjs'
import { DatePickerComponent } from 'ng2-date-picker';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss']
})
export class CrearReservaComponent implements OnInit {

  instalaciones: Instalacion[] = [];
  dispositivos: DispositivosTypeAmount[] = [];
  reservas: Reserva[] = [];
  events: Array<any> = []
  users: Usuario[] = [];

  config = {
    displayKey: "nombre", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Seleccionar', // text to be displayed when no item is selected defaults to Select,
    customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 5,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'más', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Sin resultados', // text to be displayed when no items are found while searching
    searchPlaceholder:'Buscar', // label thats displayed in search input,
    searchOnKey: 'nombre' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  userSelectOptions: any[] = [];
  selectedUser!: any;

  baseReservaModel = this.formBuilder.group({
    Titulo: ['', Validators.required],
    Descripcion: ['', Validators.required]
  });

  loggedUserID: any;
  startDate: any;
  endDate: any;
  instalacionID: any;
  dispositivosByTypeArray: DispositivosTypeAmount[] = [];
  
  calendarDate = new Date();
  
  startDatePickerConfig = {
    format: 'DD-MM-YYYY hh:mm A',
    monthFormat: 'MMM, YYYY',
    startDate: dayjs().add(2, 'day').startOf('date'),
    min: dayjs().add(2, 'day').startOf('date'),
    max: dayjs(dayjs().add(2, 'day')).add(10, 'day').startOf('date'),
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    showNearMonthDays: false,
    timeSeparator: ':',
    locale: 'es'
  }

  endDatePickerConfig = {
    format: 'DD-MM-YYYY hh:mm A',
    monthFormat: 'MMM, YYYY',
    min: dayjs().add(2, 'day').startOf('date'),
    max: dayjs(dayjs().add(2, 'day')).add(10, 'day').startOf('date'),
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    showNearMonthDays: false,
    timeSeparator: ':',
    locale: 'es'
  }

  visible = false;
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

  constructor(
    private formBuilder: FormBuilder,
    public instalacionService: InstalacionService,
    public dispositivoService: DispositivoService,
    public reservaService: ReservaService,
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    console.log(this.calendarDate.toUTCString())

    this.getAvailableUsers();
    this.loggedUserID = localStorage.getItem('userID');
  }

  getReservasInRange() {
    if (this.startDatetimeSelectedBool && this.endDatetimeSelectedBool) {
      this.reservaService.getReservasInRange(this.startDate, this.endDate).subscribe(
        res => {
          this.reservas = (res as any)
          console.log(this.reservas);

          this.events = [];
          this.setCalendarEvents(this.events, this.reservas);

          console.log(this.events);
          this.calendarReservasOptions.events = [...this.events];
        },
        err => {
          console.log(err);
        }
      );
    }
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

  getAvailableInstalaciones() {
    if (this.startDatetimeSelectedBool && this.endDatetimeSelectedBool) {
      this.instalacionService.getAvailableInstalaciones(this.startDate, this.endDate).subscribe(
        res => {
          this.instalaciones = (res as any)
          console.log(this.instalaciones);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getAvailableDispositivos() {
    if (this.startDatetimeSelectedBool && this.endDatetimeSelectedBool) {
      this.dispositivoService.getAvailableDispositivos(this.startDate, this.endDate).subscribe(
        res => {
          this.dispositivos = (res as any)
          console.log(this.dispositivos);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getAvailableUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = (res as any)
        this.userSelectOptions = this.prepareUserOptions(this.users, this.userSelectOptions);
      },
      err => {
        console.log(err);
      }
    )
  }



  prepareUserOptions(userArray: Usuario[], options: any[]) {
    userArray.forEach(user => {
      options = [...options, {id: user.id, nombre: user.names+" "+user.lastNames+" ("+user.email+")"}]
      if(user.id == localStorage.getItem('userID'))
        this.selectedUser = {id: user.id, nombre: user.names+" "+user.lastNames+" ("+user.email+")"};
    });
    return options;
  }

  startDateEvent = "untouched";
  endDateEvent = "untouched";

  instalacionSelectedBool = false;
  startDatetimeSelectedBool = false;
  endDatetimeSelectedBool = false;

  startDatetimeChanged(event: any) {
    console.log(event)

    if (typeof event != "undefined") {
      this.startDatetimeSelectedBool = true;
      this.startDate = event.$d;
      if (this.endDatetimeSelectedBool != false) {
        this.getAvailableInstalaciones();
        this.getAvailableDispositivos();
        this.getReservasInRange();
      }
    } else {
      this.startDatetimeSelectedBool = false;
      this.startDateEvent = "touched";
    }
  }

  endDatetimeChanged(event: any) {
    console.log(event)

    if (typeof event != "undefined") {
      this.endDatetimeSelectedBool = true;
      this.endDate = event.$d;
      if (this.startDatetimeSelectedBool != false) {
        this.getAvailableInstalaciones();
        this.getAvailableDispositivos();
        this.getReservasInRange();
      }
    } else {
      this.endDatetimeSelectedBool = false;
      this.endDateEvent = "touched";
    }
  }

  instalacionSelectionChanged(event: any){
    console.log(event)

    if (event.value.length != 0) {
      this.instalacionSelectedBool = true;
      this.instalacionID = event.value.id;
    }
    else
      this.instalacionSelectedBool = false;
  }

  userSelectionChanged(event: any){
    console.log(event)
  }

  countByDispositivo(type: string, event: any) {
    console.log(type+": "+event.target.value)

    if (event.target.value > 0) {
      if (this.dispositivosByTypeArray.length != 0) {
        this.dispositivosByTypeArray = this.dispositivosByTypeArray.filter(array => array.tipo != type);
        this.dispositivosByTypeArray.push(new DispositivosTypeAmount(type, event.target.value));
      } else {
        this.dispositivosByTypeArray.push(new DispositivosTypeAmount(type, event.target.value));
      }
    } else {
      if (this.dispositivosByTypeArray.length != 0)
        this.dispositivosByTypeArray = this.dispositivosByTypeArray.filter(array => array.tipo != type);
    }
  }


  onSubmit() {
    var createReservaModel = {
      titulo: this.baseReservaModel.value.Titulo,
      descripcion: this.baseReservaModel.value.Descripcion,
      datetimeCreacion: new Date(),
      datetimeInicialReservacion: this.startDate,
      datetimeFinalReservacion: this.endDate,
      userID: this.loggedUserID,
      instalacionID: this.instalacionID,
      reservaDispositivo: this.dispositivosByTypeArray,
      statusReserva: {
        fechaStatus: new Date(),
        statusID: 1
      }
    };
    console.log(createReservaModel);
  }

  onReset() {
    console.log('Reset... 1');
  }

}
