import { DispositivosTypeAmount } from '../models/dispositivos-type-amount.model';

export interface CreateReservaDTO {
    titulo: string;
    descripcion: string;
    datetimeInicialReservacion: Date;
    datetimeFinalReservacion: Date;
    dispositivosTypeAmount: DispositivosTypeAmount[];
    userID: string;
    instalacionID: string;
}
