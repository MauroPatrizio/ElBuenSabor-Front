import { IProductos } from "../productos/IProductos";
import { ISucursal } from "../sucursal/ISucursal";

export interface ICategorias {
  idCategoriaPadre: number | null | undefined;
  idSucursales: never[];
  idEmpresa: number;
  id: number;
  denominacion: string;
  eliminado: boolean;
  sucursales: ISucursal[];
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | null;
  articulos: IProductos;
}
