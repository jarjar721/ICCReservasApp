import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DispositivoService } from 'src/app/shared/dispositivo.service';

@Component({
  selector: 'app-crear-dispositivos',
  templateUrl: './crear-dispositivos.component.html',
  styleUrls: ['./crear-dispositivos.component.scss']
})
export class CrearDispositivosComponent implements OnInit {

  imageSrc = [
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'https://picsum.photos/id/1/800/400',
    'https://picsum.photos/id/1026/800/400',
    'https://picsum.photos/id/1031/800/400'
  ];

  slidesLight = [
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23AAA%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23F5F5F5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23BBB%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23EEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23E5E5E5%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
  ];
  
  slides: any[] = [];

  createDispositivoModel = this.formBuilder.group({
    Marca: ['', Validators.required],
    Modelo: ['', Validators.required],
    Tipo: ['', Validators.required],
    Serial: ['', Validators.required],
    Uso: ['', Validators.required],
    Ubicacion: ['', Validators.required],
    Observacion: ['', Validators.required]
  });

  constructor(
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public service: DispositivoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.slides[0] = [
      {
        id: 0,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[0]),
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[1]),
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: domSanitizer.bypassSecurityTrustUrl(this.imageSrc[2]),
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

    this.slides[1] = [
      {
        id: 0,
        src: this.imageSrc[3],
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: this.imageSrc[4],
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: this.imageSrc[5],
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

    this.slides[2] = [
      {
        id: 0,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[0]),
        title: 'First slide',
        subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
      },
      {
        id: 1,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[1]),
        title: 'Second slide',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        id: 2,
        src: domSanitizer.bypassSecurityTrustUrl(this.slidesLight[2]),
        title: 'Third slide',
        subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
      }
    ];

  }

  ngOnInit(): void {
    this.createDispositivoModel.reset();
  }

  onSubmit() {
    this.service.createDispositivo(this.createDispositivoModel).subscribe(
      res => {
        this.createDispositivoModel.reset();
        this.router.navigate(['/activos/dispositivos']);

        this.toastr.success('El dispositivo se ha creado exitosamente','Dispositivo creado');
      },
      err => {
        this.toastr.error(err.error.Message, '¡Ups!');
      }
    )
  }

  onReset() {
    this.router.navigate(['/activos/dispositivos']);
    this.createDispositivoModel.reset();
  }

  onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }

}
