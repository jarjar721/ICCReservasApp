export class Instalacion {

    public id: number;
    public codigo: string;
    public nombre: string;
    public tipo: string;
    public descripcion: string;
    public capacidad: number;
    public edificio: string;
    public piso: string;
    public status: number;

    constructor(
        id: number, codigo: string, nombre:string, tipo: string, descripcion: string, 
        capacidad: number, edificio: string, piso: string, status: number
        ) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
        this.edificio = edificio;
        this.piso = piso;
        this.status = status;
    }

}
