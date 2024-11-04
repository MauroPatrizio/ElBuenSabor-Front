import { FC, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "./ModalCrearSucursal.module.css";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

interface ModalSucursalProps {
	show: boolean;
	onHide: () => void;
	empresa: IEmpresa;
}

const ModalCrearSucursal: FC<ModalSucursalProps> = ({ show, onHide, empresa }) => {
	const [formData, setFormData] = useState<ICreateSucursal>({
		nombre: "",
		horarioApertura: "",
		horarioCierre: "",
		esCasaMatriz: false,
		latitud: 0,
		longitud: 0,
		domicilio: {
			calle: "",
			numero: 0,
			cp: 0,
			piso: 0,
			nroDpto: 0,
			idLocalidad: 0,
		},
		idEmpresa: 0,
		logo: "",
	});

	const [errors, setErrors] = useState({
		nombre: false,
		horarioApertura: false,
		horarioCierre: false,
		imagen: false,
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
		>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name as keyof ICreateSucursal]: value,
		});
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name as keyof ICreateSucursal]: value,
		});
	};

	const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, esCasaMatriz: e.target.checked });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isEdit) {
			const requiredErrors = {
				nombre: formData.nombre === "",
				horarioApertura: formData.horarioApertura === "",
				horarioCierre: formData.horarioCierre === "",
				imagen: formData.logo === "",
			};

			setErrors(requiredErrors);

			if (Object.values(requiredErrors).some((error) => error)) {
				return;
			}
		}

		onAddSucursal(formData);
		handleClose();
		if (!isEdit) {
			setFormData({
				nombre: "",
				horarioApertura: "",
				horarioCierre: "",
				esCasaMatriz: false,
				latitud: 0,
				longitud: 0,
				domicilio: {
					calle: "",
					numero: 0,
					cp: 0,
					piso: 0,
					nroDpto: 0,
					idLocalidad: 0,
				},
				idEmpresa: 0,
				logo: "",
			});
			setIsCasaMatriz(false);
		}
	};

	useEffect(() => {
		if (isEdit && dataSucursal) {
			setFormData(dataSucursal);
			setIsCasaMatriz(dataSucursal.esCasaMatriz);
		}
	}, [isEdit, dataSucursal]);

	return (
		<Modal
			show={handleOpen}
			onHide={handleClose}
			aria-labelledby="modal-title"
			className={styles["Modal-main"]}
			size="xl"
		>
			<Modal.Header closeButton>
				<Modal.Title>Crear / Editar Sucursal</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles["Modal-body"]}>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col md={4}>
							<Form.Group controlId="nombre">
								<Form.Label>Ingresa un nombre</Form.Label>
								<Form.Control
									type="text"
									name="nombre"
									isInvalid={errors.nombre}
									onChange={handleChange}
									value={formData.nombre}
								/>
							</Form.Group>
							<Form.Group controlId="horarioApertura">
								<Form.Label>Horario de Apertura</Form.Label>
								<Form.Control
									type="time"
									name="horarioApertura"
									isInvalid={errors.horarioApertura}
									onChange={handleChange}
									value={formData.horarioApertura}
								/>
							</Form.Group>
							<Form.Group controlId="horarioCierre">
								<Form.Label>Horario de Cierre</Form.Label>
								<Form.Control
									type="time"
									name="horarioCierre"
									isInvalid={errors.horarioCierre}
									onChange={handleChange}
									value={formData.horarioCierre}
								/>
							</Form.Group>
							<Form.Group
								controlId="esCasaMatriz"
								className={styles["div-checkbox"]}
							>
								<Form.Check
									type="checkbox"
									label="Casa Matriz"
									checked={formData.esCasaMatriz}
									onChange={handleCheckChange}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group controlId="pais">
								<Form.Label>Selecciona un País</Form.Label>
								<Form.Control
									as="select"
									name="pais"
									value={""} //todo
									onChange={handleChange}
								>
									<option></option>
									<option value="Argentina">Argentina</option>
									<option value="Chile">Chile</option>
									<option value="Uruguay">Uruguay</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="provincia">
								<Form.Label>Selecciona una Provincia</Form.Label>
								<Form.Control
									as="select"
									name="provincia"
									value={""} //todo
									onChange={handleChange}
								>
									<option></option>
									<option value="Mendoza">Mendoza</option>
									<option value="Catamarca">Catamarca</option>
									<option value="Córdoba">Córdoba</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="localidad">
								<Form.Label>Selecciona una Localidad</Form.Label>
								<Form.Control
									as="select"
									name="localidad"
									value={""} //todo
									onChange={handleChange}
								>
									<option></option>
									<option value="Tunuyan">Tunuyan</option>
									<option value="Tupungato">Tupungato</option>
									<option value="Guaymallen">Guaymallen</option>
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="latitud">
								<Form.Label>Latitud</Form.Label>
								<Form.Control
									type="text"
									name="latitud"
									value={formData.latitud}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="longitud">
								<Form.Label>Longitud</Form.Label>
								<Form.Control
									type="text"
									name="longitud"
									value={formData.longitud}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group controlId="calle">
								<Form.Label>Nombre de la calle</Form.Label>
								<Form.Control
									type="text"
									name="calle"
									value={formData.domicilio.calle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="numero">
								<Form.Label>Número de la calle</Form.Label>
								<Form.Control
									type="text"
									name="numero"
									value={formData.domicilio.numero}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="cp">
								<Form.Label>Código Postal</Form.Label>
								<Form.Control
									type="number"
									name="cp"
									value={formData.domicilio.cp}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="piso">
								<Form.Label>Ingresa un número de piso</Form.Label>
								<Form.Control
									type="number"
									name="piso"
									value={formData.domicilio.piso}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="departamento">
								<Form.Label>Ingresa un número de departamento</Form.Label>
								<Form.Control
									type="number"
									name="departamento"
									value={formData.domicilio.nroDpto}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<div className={styles["div-imagen"]}>
							<Form.Group controlId="imagen">
								<Form.Label>Ingresa la URL de la imagen</Form.Label>
								<Form.Control
									type="text"
									name="logo"
									value={formData.logo || ""}
									onChange={handleChange}
									isInvalid={errors.imagen}
								/>
							</Form.Group>
						</div>
					</Row>

					<Button
						variant="outline-warning"
						onClick={handleClose}
					>
						CANCELAR
					</Button>
					<Button
						type="submit"
						variant="outline-success"
					>
						Enviar
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

export default ModalCrearSucursal;
