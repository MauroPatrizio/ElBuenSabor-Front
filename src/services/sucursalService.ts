import axios from "axios";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";

export const BASE_URL_SUCURSALES = "http://190.221.207.224:8090/sucursales";

export const SucursalService = {
	async getSucursalByID(id: Number): Promise<ISucursal> {
		const response = await axios.get<ISucursal>(`${BASE_URL_SUCURSALES}/${id}`);
		return response.data;
	},

	async getAllSucursales(): Promise<ISucursal[]> {
		const response = await axios.get<ISucursal[]>(BASE_URL_SUCURSALES);
		return response.data;
	},

	async createSucursal(newSucursal: ICreateSucursal): Promise<ISucursal> {
		const response = await axios.post<ISucursal>(`${BASE_URL_SUCURSALES}/create`, newSucursal);
		return response.data;
	},

	async updateSucursal(id: number, editedSucursal: IUpdateSucursal): Promise<ISucursal> {
		const response = await axios.put<ISucursal>(
			`${BASE_URL_SUCURSALES}/update/${id}`,
			editedSucursal
		);
		return response.data;
	},
};
