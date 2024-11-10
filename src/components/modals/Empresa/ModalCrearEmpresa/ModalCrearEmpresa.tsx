import React, { FC, useEffect, useState } from "react";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import { Button, Form, Modal } from "react-bootstrap";
import { EmpresaService } from "../../../../services/EmpresaService";
import Swal from "sweetalert2";
import styles from "./ModalCrearEmpresa.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { toggleGlobalStyle } from "../../../../redux/slices/globalStylesSlice";

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
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const isDataComplete = Object.values(formData).every(
			(value) => value !== "" && value !== null && value !== undefined
		);

		if (!isDataComplete) {
			Swal.fire({
				icon: "warning",
				title: "Rellene todos los campos",
				showCancelButton: true,
			});
		}

		try {
			await EmpresaService.createEmpresa(formData);
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
					<Modal.Title className={styles["modal-title"]}>Agregar Empresa</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles["modal-body"]}>
					<Form>
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
