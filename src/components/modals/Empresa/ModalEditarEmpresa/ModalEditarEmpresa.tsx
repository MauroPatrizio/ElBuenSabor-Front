import { ChangeEvent, FC, useState } from "react";
import { IUpdateEmpresaDto } from "../../../../types/dtos/empresa/IUpdateEmpresaDto";
import { Button, Form, Modal } from "react-bootstrap";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import Swal from "sweetalert2";
import { BASE_URL_EMPRESAS } from "../../../../services/empresaService";

interface IModalEditarEmpresaProps {
	show: boolean;
	onHide: () => void;
	empresa: IEmpresa;
}

export const ModalEditarEmpresa: FC<IModalEditarEmpresaProps> = ({ show, onHide, empresa }) => {
	const [formData, setFormData] = useState<IUpdateEmpresaDto>({
		nombre: empresa.nombre,
		razonSocial: empresa.razonSocial,
		cuit: empresa.cuit,
		logo: empresa.logo,
		id: empresa.id,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (value.trim() !== "") {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const enviar = JSON.stringify(formData);

		try {
			const response = await fetch(`${BASE_URL_EMPRESAS}/${empresa.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: enviar,
			});

			if (response.ok) {
				Swal.fire({
					icon: "success",
					title: "Se actualizó correctamente",
					showConfirmButton: false,
					timer: 2000,
				});
				onHide();
				window.location.reload();
			} else {
				console.error("No se pudo actualizar");
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
		>
			<Modal.Header closeButton>
				<Modal.Title>Crear Empresa</Modal.Title>
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
	);
};
