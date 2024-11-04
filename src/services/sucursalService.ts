import axios from "axios";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";

export const BASE_URL_SUCURSALES = "http://190.221.207.224:8090/sucursales";

export const sucursalService = {
	async getSucursalByID(id: Number): Promise<ISucursal> {
		const response = await axios.get<ISucursal>(`${BASE_URL_SUCURSALES}/${id}`);
		return response.data;
	},

	async getAllSucursales(): Promise<ISucursal[]> {
		const response = await axios.get<ISucursal[]>(BASE_URL_SUCURSALES);
		return response.data;
	},

	async createSucursal(newSucursal: ICreateSucursal): Promise<ISucursal> {
		const response = await axios.post<ISucursal>(BASE_URL_SUCURSALES, newSucursal);
		return response.data;
	},

	async updateSucursal(id: number, editedSucursal: ISucursal): Promise<ISucursal> {
		const response = await axios.put<ISucursal>(`${BASE_URL_SUCURSALES}/${id}`, editedSucursal);
		return response.data;
	},
};
