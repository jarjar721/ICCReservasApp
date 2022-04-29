export class Dispositivo {

    public id: number;
    public serial: number;
    public tipo: string;
    public observacion: string;
    public marca: string;
    public modelo: string;
    public uso: string;
    public ubicacion: string;
    public status: number;

    constructor(
        id: number, tipo: string, observacion:string, marca: string, modelo: string, 
        serial: number, uso: string, ubicacion: string, status: number
        ) {
        this.id = id;
        this.tipo = tipo;
        this.observacion = observacion;
        this.marca = marca;
        this.modelo = modelo;
        this.serial = serial;
        this.uso = uso;
        this.ubicacion = ubicacion;
        this.status = status;
    }

}
