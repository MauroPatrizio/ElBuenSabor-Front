import { ChangeEvent, FC, useState } from "react";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { BASE_URL_SUCURSALES } from "../../../../services/SucursalService";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "./ModalEditSucursal.module.css";

interface IModalEditSucursalProps {
	show: boolean;
	onHide: () => void;
	sucursal: ISucursal;
}

export const ModalEditSucursal: FC<IModalEditSucursalProps> = ({ show, onHide, sucursal }) => {
	const [editData, setEditData] = useState<IUpdateSucursal>({
		id: sucursal.id,
		nombre: sucursal.nombre,
		idEmpresa: sucursal.empresa.id,
		eliminado: sucursal.eliminado,
		latitud: sucursal.latitud,
		longitud: sucursal.longitud,
		domicilio: {
			id: sucursal.domicilio.id,
			calle: sucursal.domicilio.calle,
			numero: sucursal.domicilio.numero,
			cp: sucursal.domicilio.cp,
			piso: sucursal.domicilio.piso,
			nroDpto: sucursal.domicilio.nroDpto,
			idLocalidad: sucursal.domicilio.localidad.id,
		},
		logo: sucursal.logo || "",
		categorias: sucursal.categorias,
		esCasaMatriz: sucursal.esCasaMatriz,
		horarioApertura: sucursal.horarioApertura,
		horarioCierre: sucursal.horarioCierre,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (value.trim() !== "") {
			setEditData({
				...editData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const data = JSON.stringify(editData);

		try {
			const response = await fetch(`${BASE_URL_SUCURSALES}/${sucursal.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: data,
			});

			if (response.ok) {
				Swal.fire({
					icon: "success",
					title: "Edicion Completada",
					showCancelButton: false,
					timer: 500,
				});
				onHide();
			} else {
				Swal.fire({
					icon: "error",
					title: "No se pudo completar la edición",
				});
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="modal-title"
			className={styles["Modal-main"]}
			size="xl"
			centered
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title>Editar Sucursal {sucursal.nombre}</Modal.Title>
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
									onChange={handleChange}
									value={editData.nombre}
								/>
							</Form.Group>
							<Form.Group controlId="horarioApertura">
								<Form.Label>Horario de Apertura</Form.Label>
								<Form.Control
									type="time"
									name="horarioApertura"
									onChange={handleChange}
									value={editData.horarioApertura}
								/>
							</Form.Group>
							<Form.Group controlId="horarioCierre">
								<Form.Label>Horario de Cierre</Form.Label>
								<Form.Control
									type="time"
									name="horarioCierre"
									onChange={handleChange}
									value={editData.horarioCierre}
								/>
							</Form.Group>
							<Form.Group
								controlId="esCasaMatriz"
								className={styles["div-checkbox"]}
							>
								<Form.Check
									type="checkbox"
									label="Casa Matriz"
									checked={editData.esCasaMatriz}
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
									value={editData.latitud}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="longitud">
								<Form.Label>Longitud</Form.Label>
								<Form.Control
									type="text"
									name="longitud"
									value={editData.longitud}
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
									value={editData.domicilio.calle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="numero">
								<Form.Label>Número de la calle</Form.Label>
								<Form.Control
									type="text"
									name="numero"
									value={editData.domicilio.numero}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="cp">
								<Form.Label>Código Postal</Form.Label>
								<Form.Control
									type="number"
									name="cp"
									value={editData.domicilio.cp}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="piso">
								<Form.Label>Ingresa un número de piso</Form.Label>
								<Form.Control
									type="number"
									name="piso"
									value={editData.domicilio.piso}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="departamento">
								<Form.Label>Ingresa un número de departamento</Form.Label>
								<Form.Control
									type="number"
									name="departamento"
									value={editData.domicilio.nroDpto}
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
									value={editData.logo || ""}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</Row>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-warning"
					onClick={onHide}
				>
					CANCELAR
				</Button>
				<Button
					type="submit"
					onClick={handleSubmit}
					variant="outline-success"
				>
					Enviar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
