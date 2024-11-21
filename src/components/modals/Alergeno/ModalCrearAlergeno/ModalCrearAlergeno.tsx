import React, { FC, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
7;
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";
import { alergenoService } from "../../../../services/alergenoService";
import Swal from "sweetalert2";

interface IModalCrearAlergenoProps {
	show: boolean;
	onHide: () => void;
}

const ModalCrearAlergeno: FC<IModalCrearAlergenoProps> = ({ show, onHide }) => {
	const [formData, setFormData] = useState<ICreateAlergeno>({
		denominacion: "",
		imagen: {
			name: "",
			url: "",
		},
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "imagen") {
			setFormData((prev) => ({
				...prev,
				imagen: {
					name: "",
					url: "",
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await alergenoService.createAlergeno(formData);
			Swal.fire({
				icon: "success",
				title: "Se añadio correctamente",
				showCancelButton: false,
				timer: 500,
			});

			onHide();
			window.location.reload();
		} catch (e) {
			console.error(e);

			Swal.fire({
				icon: "error",
				title: "Error",
				text: "No se pudo agregar el producto",
			});
			onHide();
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title>Agregar Alergeno</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="denominacion">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="denominacion"
							value={formData.denominacion}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="imagen">
						<Form.Label>ELIGE UNA IMAGEN</Form.Label>
						<Form.Control
							type="file"
							name="imagen"
							onChange={handleChange}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-warning"
					onClick={onHide}
				>
					Cancelar
				</Button>
				<Button
					variant="outline-success"
					onClick={handleSubmit}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalCrearAlergeno;
