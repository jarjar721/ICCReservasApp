export class Horario {

    public id: number;
    public nivel: string;
    public nombre: string;
    public horaInicio: string;
    public horaFin: string;

    constructor(id: number, nivel: string, nombre: string, horaInicio: string, horaFin: string) {
        this.id = id;
        this.nivel = nivel;
        this.nombre = nombre;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

}
