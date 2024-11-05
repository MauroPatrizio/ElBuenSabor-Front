import axios from "axios";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IProductos } from "../types/dtos/productos/IProductos";



export const BASE_URL_CATEGORIAS = "http://190.221.207.224:8090/categorias";


export const categoriaService = {
    async getCategoriaByID(id: number): Promise<ICategorias>{
        const response = await axios.get<ICategorias>(`${BASE_URL_CATEGORIAS}`)
        return response.data
    },
    async getAllCategorias():Promise<ICategorias[]>{
        const response = await axios.get<ICategorias[]>(BASE_URL_CATEGORIAS)
        return response.data
    },

    async createCategoria(newCategoria:ICreateCategoria): Promise<ICategorias>{
        const response = await axios.post<ICategorias>(BASE_URL_CATEGORIAS, newCategoria)
        return response.data
    },

    async updateCategoria(id: number, editedCategoria: ICategorias): Promise<ICategorias>{
        const response = await axios.put<ICategorias>(`${BASE_URL_CATEGORIAS}/${id}`, editedCategoria)
        return response.data
    }


}