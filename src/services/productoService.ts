import axios from "axios";
import { IProductos } from "../types/dtos/productos/IProductos";
import { ICreateProducto } from "../types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../types/dtos/productos/IUpdateProducto";

export const BASE_URL_PRODUCTOS = "http://190.221.207.224:8090/articulos";

export const productoService = {
    async getProductosByID(id:Number): Promise<IProductos>{
        const response = await axios.get<IProductos>(`${BASE_URL_PRODUCTOS}/${id}`)
        return response.data
    },

    async getAllProductos():Promise<IProductos[]>{
        const response = await axios.get<IProductos[]>(BASE_URL_PRODUCTOS)
        return response.data
    },

    async createProduct (newProduct: ICreateProducto):Promise<IProductos>{
        const response = await axios.post<IProductos>(BASE_URL_PRODUCTOS, newProduct)
        return response.data
    },

    async updateProduct (id: number, editedProducto: IUpdateProducto): Promise<IProductos>{
        const response = await axios.put<IProductos>(`${BASE_URL_PRODUCTOS}/${id}`, editedProducto)
        return response.data
    },
    
    async deleteProduct(id: number): Promise<void> {
        await axios.delete(`${BASE_URL_PRODUCTOS}/${id}`);
    }

}