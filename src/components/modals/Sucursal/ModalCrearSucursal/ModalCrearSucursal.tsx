import { FC, useEffect, useState } from "react";
import { SucursalService } from "../../../../services/SucursalService";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "./ModalCrearSucursal.module.css";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { useForm } from "../../../../hooks/useForm";

interface IModalCrearSucursalProps {
	show: boolean;
	onHide: () => void;
	empresa: IEmpresa | null;
}

interface Option {
	id: string;
	name: string;
}

const ModalCrearSucursal: FC<IModalCrearSucursalProps> = ({ show, onHide, empresa }) => {
	if (!empresa) {
		return null;
	}

	const [options, setOptions] = useState<Option[]>([]);

	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const fetchOptions = async (tipo: string) => {
		try {
			const response = await fetch(`http://190.221.207.224:8090/${tipo}`);
			if (response.ok) {
				const dato = await response.json();
				setOptions(dato);
			} else {
				console.error("No se pudo cargar las opciones");
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (selectedOption) {
			fetchOptions(selectedOption);
		}
	}, [selectedOption]);

	const { data, handleChange, handleSelectChange, resetForm } = useForm({
		nombre: "",
		horarioApertura: "",
		horarioCierre: "",
		esCasaMatriz: false,
		pais: "",
		provincia: "",
		localidad: "",
		latitud: 0,
		longitud: 0,
		calle: "",
		numeroCalle: 0,
		cp: 0,
		piso: 0,
		nroDpto: 0,
		logo: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const newSucursal: ICreateSucursal = {
				nombre: data.nombre,
				horarioApertura: data.horarioApertura,
				horarioCierre: data.horarioCierre,
				esCasaMatriz: data.esCasaMatriz,
				latitud: data.latitud,
				longitud: data.longitud,
				domicilio: {
					calle: data.calle,
					numero: data.numeroCalle,
					piso: data.piso,
					nroDpto: data.nroDpto,
					idLocalidad: 0,
					cp: data.cp,
				},
				idEmpresa: empresa.id,
				logo: data.logo,
			};
			await SucursalService.createSucursal(newSucursal);
			Swal.fire({
				icon: "success",
				title: "Sucursal Creada",
				showConfirmButton: false,
				timer: 2000,
			});
			resetForm();
			onHide();
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "No se pudo crear la sucursal",
				text: `${e}`,
				showConfirmButton: true,
			});
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
				<Modal.Title>Crear Sucursal</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles["Modal-body"]}>
				<Form>
					<Row>
						<Col md={4}>
							<Form.Group controlId="nombre">
								<Form.Label>Ingresa un nombre</Form.Label>
								<Form.Control
									type="text"
									name="nombre"
									onChange={handleChange}
									value={data.nombre}
								/>
							</Form.Group>
							<Form.Group controlId="horarioApertura">
								<Form.Label>Horario de Apertura</Form.Label>
								<Form.Control
									type="time"
									name="horarioApertura"
									onChange={handleChange}
									value={data.horarioApertura}
								/>
							</Form.Group>
							<Form.Group controlId="horarioCierre">
								<Form.Label>Horario de Cierre</Form.Label>
								<Form.Control
									type="time"
									name="horarioCierre"
									onChange={handleChange}
									value={data.horarioCierre}
								/>
							</Form.Group>
							<Form.Group
								controlId="esCasaMatriz"
								className={styles["div-checkbox"]}
							>
								<Form.Check
									type="checkbox"
									label="Casa Matriz"
									checked={data.esCasaMatriz}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group controlId="pais">
								<Form.Label>País</Form.Label>
								<Form.Control
									as="select"
									name="pais"
									value={data.pais}
									onChange={(e) => {
										const selectedPais = e.target.value;
										handleSelectChange(e);
										setSelectedOption(selectedPais);
										fetchOptions(`paises`);
									}}
								>
									<option value="">Seleccione un pais</option>
									{options.map((option) => (
										<option
											key={option.id}
											value={option.id}
										>
											{option.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="provincia">
								<Form.Label>Provincia</Form.Label>
								<Form.Control
									as="select"
									name="provincia"
									value={data.provincia}
									onChange={(e) => {
										const selectedProvincia = e.target.value;
										handleFormChange(e);
										setSelectedOption(selectedProvincia);
										fetchOptions(`provincias/findByPais/1`);
									}}
								>
									<option value="">Seleccione una provincia</option>
									{options.map((option) => (
										<option
											key={option.id}
											value={option.id}
										>
											{option.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="localidad">
								<Form.Label>Selecciona una Localidad</Form.Label>
								<Form.Control
									type="text"
									name="localidad"
									value={""} //todo
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="latitud">
								<Form.Label>Latitud</Form.Label>
								<Form.Control
									type="number"
									name="latitud"
									value={data.latitud}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="longitud">
								<Form.Label>Longitud</Form.Label>
								<Form.Control
									type="number"
									name="longitud"
									value={data.longitud}
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
									value={data.calle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="numero">
								<Form.Label>Número de la calle</Form.Label>
								<Form.Control
									type="number"
									name="numero"
									value={data.numeroCalle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="cp">
								<Form.Label>Código Postal</Form.Label>
								<Form.Control
									type="number"
									name="cp"
									value={data.cp}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="piso">
								<Form.Label>Ingresa un número de piso</Form.Label>
								<Form.Control
									type="number"
									name="piso"
									value={data.piso}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="nroDpto">
								<Form.Label>Ingresa un número de departamento</Form.Label>
								<Form.Control
									type="number"
									name="nroDpto"
									value={data.nroDpto}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className={styles["div-imagen"]}>
								<Form.Group controlId="imagen">
									<Form.Label>Ingresa la URL de la imagen</Form.Label>
									<Form.Control
										type="text"
										name="logo"
										value={data.logo || ""}
										onChange={handleChange}
									/>
								</Form.Group>
							</div>
						</Col>
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
					type="button"
					onClick={handleSubmit}
					variant="outline-success"
				>
					Enviar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalCrearSucursal;
