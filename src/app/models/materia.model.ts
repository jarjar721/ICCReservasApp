export class Materia {

    public id: number;
    public codigo: string;
    public nombre: string;
    public grado: string;
    public nivel: string;
    public status: number;

    constructor(id: number, codigo: string, nombre:string, grado: string, nivel: string, status: number) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.grado = grado;
        this.nivel = nivel;
        this.status = status;
    }

}
