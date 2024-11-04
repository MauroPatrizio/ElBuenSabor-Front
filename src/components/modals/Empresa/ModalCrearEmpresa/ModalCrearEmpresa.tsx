import React, { FC, useState } from "react";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import { Button, Form, Modal } from "react-bootstrap";
import { empresaService } from "../../../../services/empresaService";
import Swal from "sweetalert2";
import styles from "./ModalCrearEmpresa.module.css";

interface IModalCrearEmpresaProps {
	show: boolean;
	onHide: () => void;
}

export const ModalCrearEmpresa: FC<IModalCrearEmpresaProps> = ({ show, onHide }) => {
	const [formData, setFormData] = useState<ICreateEmpresaDto>({
		nombre: "",
		razonSocial: "",
		cuit: 0,
		logo: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "cuit" ? parseInt(value) : value,
		}));
	};

	// const [errors, setErrors ] = useState ({
	// 	nombre: false,
	// 	razonSocial: false,
	// 	cuit: false,
	// }) //TODO

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await empresaService.createEmpresa(formData);
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
		}
	};

	return (
		<div className={styles["div-main"]}>
			<Modal
				show={show}
				onHide={onHide}
				className={styles["modal"]}
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Agregar Empresa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="nombre">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								name="nombre"
								value={formData.nombre}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="razonSocial">
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								name="razonSocial"
								value={formData.razonSocial}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="cuit">
							<Form.Label>CUIT</Form.Label>
							<Form.Control
								type="text"
								name="cuit"
								value={formData.cuit}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="logo">
							<Form.Label>Logo</Form.Label>
							<Form.Control
								type="text"
								name="logo"
								value={formData.logo || ""}
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
		</div>
	);
};
