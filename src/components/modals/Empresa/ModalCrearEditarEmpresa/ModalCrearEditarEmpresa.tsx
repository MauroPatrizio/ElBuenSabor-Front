import React, { FC, useState } from "react";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import { Button, Form, Modal } from "react-bootstrap";
import { EmpresaService } from "../../../../services/empresaService";
import Swal from "sweetalert2";
import { IUpdateEmpresaDto } from "../../../../types/dtos/empresa/IUpdateEmpresaDto";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface IModalCrearEditarEmpresaProps {
	show: boolean;
	onHide: () => void;
	empresa?: IEmpresa;
}

export const ModalCrearEditarEmpresa: FC<IModalCrearEditarEmpresaProps> = ({
	show,
	onHide,
	empresa,
}) => {
	const [formData, setFormData] = useState<ICreateEmpresaDto | IUpdateEmpresaDto>({
		nombre: empresa?.nombre || "",
		razonSocial: empresa?.razonSocial || "",
		cuit: empresa?.cuit || parseInt(""),
		logo: empresa?.logo || "",
		id: empresa?.id,
	});

	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

	const formValidar = () => {
		const errors: { [key: string]: string } = {};

		if (!formData.nombre) errors.nombre = "Campo obligatorio.";
		if (!formData.razonSocial) errors.razonSocial = "Campo obligatorio.";
		if (!formData.cuit) {
			errors.cuit = "Campo obligarorio";
		} else if (formData.cuit.toString().length !== 11) {
			errors.cuit = "El CUIT debe tener 11 números";
		}
		if (!formData.logo) errors.logo = "Campo obligatorio";

		return errors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: name === "cuit" ? parseInt(value) || 0 : value,
		}));

		setFormErrors((prevErrors) => {
			if (value.trim() !== "") {
				const { [name]: removedError, ...restErrors } = prevErrors;
				return restErrors;
			}
			return prevErrors;
		});
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setFormErrors({});

		const errors = formValidar();

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		try {
			if (empresa) {
				//Edit
				await EmpresaService.updateEmpresa(empresa.id, formData as IUpdateEmpresaDto);

				Swal.fire({
					icon: "success",
					title: "Empresa actualizada",
					showConfirmButton: false,
					timer: 1200,
				});
			} else {
				//Create
				await EmpresaService.createEmpresa(formData as ICreateEmpresaDto);

				Swal.fire({
					icon: "success",
					title: "Empresa creada",
					showConfirmButton: false,
					timer: 1200,
				});
			}
			onHide();
			window.location.reload();
		} catch (e) {
			console.error(e);
			Swal.fire({
				icon: "error",
				title: "No se pudo guardar la empresa",
			});
		}
	};

	return (
		<div>
			<Modal
				show={show}
				onHide={onHide}
				backdrop="static"
				centered
			>
				<Modal.Header
					closeButton
					style={{
						display: "flex",
						backgroundColor: "#567C8D",
						color: "#fff",
					}}
				>
					<Modal.Title style={{ width: "100%", textAlign: "center" }}>
						{empresa ? "EDITAR EMPRESA" : "AGREGAR EMPRESA"}
					</Modal.Title>
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
								isInvalid={!!formErrors.nombre}
							/>
							<Form.Control.Feedback type="invalid">
								{formErrors.nombre}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="razonSocial">
							<Form.Label>Razon Social</Form.Label>
							<Form.Control
								type="text"
								name="razonSocial"
								value={formData.razonSocial}
								onChange={handleChange}
								isInvalid={!!formErrors.razonSocial}
							/>
							<Form.Control.Feedback type="invalid">
								{formErrors.razonSocial}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="cuit">
							<Form.Label>CUIT</Form.Label>
							<Form.Control
								type="number"
								name="cuit"
								value={formData.cuit}
								onChange={handleChange}
								isInvalid={!!formErrors.cuit}
							/>
							<Form.Control.Feedback type="invalid">
								{formErrors.cuit}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							controlId="logo"
							className="w-100"
						>
							<Form.Label>Logo</Form.Label>
							<Form.Control
								type="text"
								name="logo"
								value={formData.logo || ""}
								onChange={handleChange}
								isInvalid={!!formErrors.logo}
							/>
							<Form.Control.Feedback type="invalid">
								{formErrors.logo}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="d-flex justify-content-center align-items-center">
							<img
								src={formData.logo || ""}
								style={{ maxWidth: "15rem", height: "auto" }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={onHide}
					>
						Cancelar
					</Button>
					<Button
						variant="success"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
