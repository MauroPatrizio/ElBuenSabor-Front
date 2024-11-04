import axios from "axios";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";

export const BASE_URL_EMPRESAS = "http://190.221.207.224:8090/empresas";

export const empresaService = {
	async getEmpresaByID(id: Number): Promise<IEmpresa> {
		const response = await axios.get<IEmpresa>(`${BASE_URL_EMPRESAS}/${id}`);
		return response.data;
	},

	async getAllEmpresas(): Promise<IEmpresa[]> {
		const response = await axios.get<IEmpresa[]>(BASE_URL_EMPRESAS);
		return response.data;
	},

	async createEmpresa(newEmpresa: ICreateEmpresaDto): Promise<IEmpresa> {
		const response = await axios.post<IEmpresa>(BASE_URL_EMPRESAS, newEmpresa);
		return response.data;
	},

	async updateEmpresa(id: number, editedEmpresa: IEmpresa): Promise<IEmpresa> {
		const response = await axios.put<IEmpresa>(`${BASE_URL_EMPRESAS}/${id}`, editedEmpresa);
		return response.data;
	},
};
