export class ReservaDispositivo {

    public id: number;
    public dispositivoID: number;
    public reservaID: number;

    constructor(id: number, dispositivoID: number, reservaID: number) {
        this.id = id;
        this.dispositivoID = dispositivoID;
        this.reservaID = reservaID;
    }
}
