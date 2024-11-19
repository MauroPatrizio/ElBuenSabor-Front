import { IImagen } from "../../IImagen";

export interface ICreateAlergeno {
  id?: number;       // id es opcional
  denominacion: string;
  imagen: IImagen | null;
}
