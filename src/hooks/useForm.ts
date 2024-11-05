import { ChangeEvent, useState } from "react";

interface FormValue {
	[key: string]: string | number | boolean | object | undefined;
}

export const useForm = <T extends FormValue>(initialData: T) => {
	const [data, setData] = useState<T>(initialData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (name === "cuit") {
			const numericValue = value.replace(/^\d{11}$/, "");
			if (numericValue.length <= 11) {
				setData({ ...data, [name]: numericValue });
			}
			return;
		}
		setData({ ...data, [name]: value });
	};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value, name } = e.target;

		setData({ ...data, [name]: value });
	};

	const resetForm = () => {
		setData(initialData);
	};
	return {
		data,
		handleChange,
		handleSelectChange,
		resetForm,
	};
};
