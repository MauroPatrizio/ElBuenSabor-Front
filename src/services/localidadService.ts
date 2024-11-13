import axios from "axios";
import { ILocalidad } from "../types/ILocalidad";

const BASE_URL = `http://190.221.207.224:8090/localidades`;

export const localidadService = {
	async getAllLocalidades(idProvincia: number): Promise<ILocalidad[]> {
		const response = await axios.get<ILocalidad[]>(
			`${BASE_URL}/findByProvincia/${idProvincia}`
		);
		return response.data;
	},
};

// http://190.221.207.224:8090/localidades/findByProvincia/2
