export class Horario {

    public id: number;
    public numero: number;
    public nivel: string;
    public horaInicio: string;
    public horaFin: string;

    constructor(id: number, numero: number, nivel: string, horaInicio: string, horaFin: string) {
        this.id = id;
        this.numero = numero;
        this.nivel = nivel;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

}
