import axios from "axios";
import { IProvincia } from "../types/IProvincia";

const BASE_URL = `http://190.221.207.224:8090/provincias`;

export const provinciaService = {
	async getAllProvincias(idPais: number): Promise<IProvincia[]> {
		const response = await axios.get<IProvincia[]>(`${BASE_URL}/findByPais/${idPais}`);
		return response.data;
	},
};
