export class StatusReserva {

    public id: number;
    public fechaStatus: Date;
    public reservaID: number;
    public statusID: number;

    constructor(id: number, fechaStatus: Date, reservaID: number, statusID: number) {
        this.id = id;
        this.fechaStatus = fechaStatus;
        this.reservaID = reservaID;
        this.statusID = statusID;
    }

}
