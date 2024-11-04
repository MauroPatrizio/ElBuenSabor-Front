import axios, { AxiosInstance, AxiosResponse } from "axios";

class Service {
	private axiosInstance: AxiosInstance;

	constructor(baseURL: string) {
		this.axiosInstance = axios.create({
			baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	// GET
	public async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
		return this.axiosInstance.get(url, { params });
	}

	// POST
	public async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
		return this.axiosInstance.post(url, data);
	}

	// PUT - UPDATE - EDIT
	public async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
		return this.axiosInstance.put(url, data);
	}

	// DELETE
	public async delete<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
		return this.axiosInstance.delete(url, { params });
	}
}

export default Service;
