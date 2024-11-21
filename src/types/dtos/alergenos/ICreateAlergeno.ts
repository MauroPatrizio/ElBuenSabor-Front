import { IImagen } from "../../IImagen";

export interface ICreateAlergeno {
  id?: number;       
  denominacion: string;
  imagen: IImagen | null;
}
