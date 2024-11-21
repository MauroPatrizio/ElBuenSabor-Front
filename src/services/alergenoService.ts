import axios from "axios";
import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";

export const BASE_URL_ALERGENOS = "http://190.221.207.224:8090/alergenos";

export const alergenoService = {
    async getAlergenoByID(id: number): Promise<IAlergenos> {
        const response = await axios.get<IAlergenos>(`${BASE_URL_ALERGENOS}/${id}`);
        return response.data;
    },
    async getAllAlergenos(): Promise<IAlergenos[]> {
        const response = await axios.get<IAlergenos[]>(BASE_URL_ALERGENOS);
        return response.data;
    },
    async createAlergeno(newAlergeno: ICreateAlergeno): Promise<IAlergenos> {
        const response = await axios.post<IAlergenos>(BASE_URL_ALERGENOS, newAlergeno);
        return response.data;
    },
    async updateAlergeno(id: number, editedAlergeno: IAlergenos): Promise<IAlergenos> {
        const response = await axios.put<IAlergenos>(`${BASE_URL_ALERGENOS}/${id}`, editedAlergeno);
        return response.data;
    },
    async deleteAlergeno(id: number): Promise<void> {
        await axios.delete(`${BASE_URL_ALERGENOS}/${id}`);
    },
};
