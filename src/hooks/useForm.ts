import { ChangeEvent, useState } from "react";

interface FormValue {
	[key: string]: string | number | boolean | object | undefined;
}

export const useForm = <T extends FormValue>(initialValues: T) => {
	const [values, setValues] = useState<T>(initialValues);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (name === "cuit") {
			const numericValue = value.replace(/^\d{11}$/, "");
			if (numericValue.length <= 11) {
				setValues({ ...values, [name]: numericValue });
			}
			return;
		}
		setValues({ ...values, [name]: value });
	};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value, name } = e.target;

		setValues({ ...values, [name]: value });
	};

	const resetForm = () => {
		setValues(initialValues);
	};
	return {
		values,
		handleChange,
		handleSelectChange,
		resetForm,
	};
};
