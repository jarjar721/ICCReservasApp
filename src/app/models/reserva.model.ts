export class Reserva {

    public id: number;
    public titulo: string;
    public descripcion: string;
    public datetimeCreacion: Date;
    public datetimeInicialReservacion: Date;
    public datetimeFinalReservacion: Date;
    public userID: string;
    public instalacionID: number;

    constructor(
        id: number,
        titulo: string,
        descripcion: string,
        datetimeCreacion: Date,
        datetimeInicialReservacion: Date,
        datetimeFinalReservacion: Date,
        userID: string,
        instalacionID: number
        ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.datetimeCreacion = datetimeCreacion;
        this.datetimeInicialReservacion = datetimeInicialReservacion;
        this.datetimeFinalReservacion = datetimeFinalReservacion;
        this.userID = userID;
        this.instalacionID = instalacionID;
    }

}
