import { ChangeEvent, FC, useEffect, useState } from "react";
import { IUpdateEmpresaDto } from "../../../../types/dtos/empresa/IUpdateEmpresaDto";
import { Button, Form, Modal } from "react-bootstrap";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import Swal from "sweetalert2";
import { BASE_URL_EMPRESAS } from "../../../../services/EmpresaService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { toggleGlobalStyle } from "../../../../redux/slices/globalStylesSlice";
import styles from "./ModalEditarEmpresa.module.css";

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
		setFormData({
			...formData,
			[name]: value,
		});
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
					timer: 3000,
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

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (show) {
			dispatch(toggleGlobalStyle(true));
		} else {
			dispatch(toggleGlobalStyle(false));
		}

		return () => {
			dispatch(toggleGlobalStyle(false));
		};
	}, [show, dispatch]);

	return (
		<div className={styles["div-main"]}>
			<Modal
				show={show}
				onHide={onHide}
				className={styles["modal"]}
				backdrop="static"
				centered
			>
				<Modal.Header
					closeButton
					className={styles["modal-header"]}
				>
					<Modal.Title className={styles["modal-title"]}>Editar Empresa</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles["modal-body"]}>
					<Form onSubmit={handleSubmit}>
						<Form.Group
							controlId="nombre"
							className={styles["form-group"]}
						>
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="text"
								name="nombre"
								value={formData.nombre}
								onChange={handleChange}
								className={styles["form-control"]}
							/>
						</Form.Group>

						<Form.Group
							controlId="razonSocial"
							className={styles["form-group"]}
						>
							<Form.Label>Razon Social</Form.Label>
							<Form.Control
								type="text"
								name="razonSocial"
								value={formData.razonSocial}
								onChange={handleChange}
								className={styles["form-control"]}
							/>
						</Form.Group>

						<Form.Group
							controlId="cuit"
							className={styles["form-group"]}
						>
							<Form.Label>CUIT</Form.Label>
							<Form.Control
								type="number"
								name="cuit"
								value={formData.cuit}
								onChange={handleChange}
								className={styles["form-control"]}
							/>
						</Form.Group>

						<Form.Group
							controlId="logo"
							className={styles["form-group"]}
						>
							<Form.Label>Logo</Form.Label>
							<Form.Control
								type="text"
								name="logo"
								value={formData.logo || ""}
								onChange={handleChange}
								className={styles["form-control"]}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer className={styles["modal-footer"]}>
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
