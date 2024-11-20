import React, { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { productoService } from "../../../../services/productoService";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";

interface IModalCrearProductoProps {
	show: boolean;
	onHide: () => void;
}

export const ModalCrearProducto: FC<IModalCrearProductoProps> = ({ show, onHide }) => {
	const [formData, setFormData] = useState<ICreateProducto>({
		denominacion: "",
		precioVenta: 0,
		descripcion: "",
		habilitado: true,
		codigo: "",
		idCategoria: 0,
		idAlergenos: [],
		imagenes: [],
	});

	const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
		const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Validación para asegurarse que los campos estén completos
		const isDataComplete = Object.values(formData).every(
			(value) => value !== "" && value !== null && value !== undefined
		);

		if (!isDataComplete) {
			Swal.fire({
				icon: "warning",
				title: "Rellene todos los campos",
				showCancelButton: true,
			});
			return;
		}

		try {
			await productoService.createProduct(formData);
			Swal.fire({
				icon: "success",
				title: "Producto agregado correctamente",
				showCancelButton: false,
				timer: 500,
			});
			onHide();
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop="static"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Crear Producto</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group controlId="denominacion">
						<Form.Label>Denominación</Form.Label>
						<Form.Control
							type="text"
							name="denominacion"
							value={formData.denominacion}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="precioVenta">
						<Form.Label>Precio de Venta</Form.Label>
						<Form.Control
							type="number"
							name="precioVenta"
							value={formData.precioVenta}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="descripcion">
						<Form.Label>Descripción</Form.Label>
						<Form.Control
							type="text"
							name="descripcion"
							value={formData.descripcion}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="codigo">
						<Form.Label>Código</Form.Label>
						<Form.Control
							type="text"
							name="codigo"
							value={formData.codigo}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="habilitado">
						<Form.Check
							type="checkbox"
							name="habilitado"
							label="Habilitado"
							checked={formData.habilitado}
							onChange={handleCheckboxChange}
						/>
					</Form.Group>

					<Form.Group controlId="idCategoria">
						<Form.Label>Categoría</Form.Label>
						<Form.Control
							as="select"
							name="idCategoria"
							value={formData.idCategoria}
							onChange={handleChange}
							required
						>
							<option value={0}>Seleccionar categoría</option>
							{/* Aquí se deberían cargar las categorías disponibles */}
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={onHide}
				>
					Cancelar
				</Button>
				<Button
					variant="primary"
					onClick={handleSubmit}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
