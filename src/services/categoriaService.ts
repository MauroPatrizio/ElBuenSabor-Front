import axios from "axios";
import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";

export const BASE_URL_CATEGORIAS = "http://190.221.207.224:8090/categorias";

export const categoriaService = {
	async getCategoriaByID(id: number): Promise<ICategorias> {
		const response = await axios.get<ICategorias>(`${BASE_URL_CATEGORIAS}/${id}`);
		return response.data;
	},
	async getAllCategorias(): Promise<ICategorias[]> {
		const response = await axios.get<ICategorias[]>(BASE_URL_CATEGORIAS);
		return response.data;
	},
	async createCategoria(newCategoria: ICreateCategoria): Promise<ICategorias> {
		const response = await axios.post<ICategorias>(BASE_URL_CATEGORIAS, newCategoria);
		return response.data;
	},
	async updateCategoria(id: number, editedCategoria: IUpdateCategoria): Promise<ICategorias> {
		const response = await axios.put<ICategorias>(
			`${BASE_URL_CATEGORIAS}/${id}`,
			editedCategoria
		);
		return response.data;
	},
	async deleteCategoria(id: number): Promise<void> {
		await axios.delete(`${BASE_URL_CATEGORIAS}/${id}`);
	},
	
	async getSubcategoriasByCategoriaId(categoriaId: number): Promise<ICategorias['subCategorias']> {
		try {
		  const categoria = await this.getCategoriaByID(categoriaId);
		  return categoria.subCategorias.filter((subCat) => !subCat.eliminado); // Filtrar eliminadas
		} catch (error) {
		  console.error("Error al listar subcategorías:", error);
		  throw error;
		}
	  },
};
