import { ChangeEvent, FC, useEffect, useState } from "react";
import { sucursalService } from "../../../../services/sucursalService";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import styles from "./ModalCrearSucursal.module.css";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import { paisService } from "../../../../services/paisService";
import { provinciaService } from "../../../../services/provinciaService";
import { localidadService } from "../../../../services/localidadService";

interface IModalCrearSucursalProps {
	show: boolean;
	onHide: () => void;
	idEmpresa: number;
}

const ModalCrearSucursal: FC<IModalCrearSucursalProps> = ({ show, onHide, idEmpresa }) => {
	const [newSucursal, setNewSucursal] = useState<ICreateSucursal>({
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
		idEmpresa: idEmpresa,
		logo: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setNewSucursal((prev) => {
			if (name in prev.domicilio) {
				return {
					...prev,
					domicilio: {
						...prev.domicilio,
						[name]: type === "number" ? parseInt(value) : value,
					},
				};
			}
			return {
				...prev,
				[name]:
					type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
			};
		});
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await sucursalService.createSucursal(newSucursal);

			Swal.fire({
				icon: "success",
				title: "Sucursal Creada",
				showCancelButton: false,
				timer: 1800,
				didClose: () => {
					window.location.reload();
				},
			});
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "No se pudo carga la sucursal",
				showCloseButton: true,
			});
		}
	};

	const [paises, setPaises] = useState<IPais[]>([]);
	const [provincias, setProvincias] = useState<IProvincia[]>([]);
	const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

	const [selectedPais, setSelectedPais] = useState("");
	const [selectedProvincia, setSelectedProvincia] = useState("");
	const [selectedLocalidad, setSelectedLocalidad] = useState("");

	//Fetch de Paises
	useEffect(() => {
		const fetchPaises = async () => {
			try {
				const data = await paisService.getAllPaises();
				setPaises(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
			} catch (e) {
				console.error(e);
			}
		};
		fetchPaises();
	}, []);

	//Fetch de Provincias segun el pais
	useEffect(() => {
		if (selectedPais) {
			const fetchProvincias = async () => {
				try {
					const data = await provinciaService.getAllProvincias(Number(selectedPais));
					setProvincias(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
					setLocalidades([]);
				} catch (e) {
					console.error(e);
				}
			};
			fetchProvincias();
		}
	}, [selectedPais]);

	//Fetch de localidades segun provincia
	useEffect(() => {
		if (selectedProvincia) {
			const fetchLocalidades = async () => {
				try {
					const data = await localidadService.getAllLocalidades(
						Number(selectedProvincia)
					);
					setLocalidades(data.sort((a, b) => a.nombre.localeCompare(b.nombre)));
				} catch (e) {
					console.error(e);
				}
			};
			fetchLocalidades();
		}
	}, [selectedProvincia]);

	const handleChangePais = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedPais(e.target.value);
		setSelectedProvincia("");
		setSelectedLocalidad("");
	};

	const handleChangeProvincia = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedProvincia(e.target.value);
		setSelectedLocalidad("");
	};

	const handleChangeLocalidad = (e: ChangeEvent<HTMLSelectElement>) => {
		const idLocalidad = parseInt(e.target.value);
		setSelectedLocalidad(e.target.value);

		setNewSucursal((prev) => ({
			...prev,
			domicilio: {
				...prev.domicilio,
				idLocalidad: idLocalidad,
			},
		}));
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
									value={newSucursal.nombre}
								/>
							</Form.Group>
							<Form.Group controlId="horarioApertura">
								<Form.Label>Horario de Apertura</Form.Label>
								<Form.Control
									type="time"
									name="horarioApertura"
									onChange={handleChange}
									value={newSucursal.horarioApertura}
								/>
							</Form.Group>
							<Form.Group controlId="horarioCierre">
								<Form.Label>Horario de Cierre</Form.Label>
								<Form.Control
									type="time"
									name="horarioCierre"
									onChange={handleChange}
									value={newSucursal.horarioCierre}
								/>
							</Form.Group>
							<Form.Group
								controlId="esCasaMatriz"
								className={styles["div-checkbox"]}
							>
								<Form.Check
									type="checkbox"
									label="Casa Matriz"
									checked={newSucursal.esCasaMatriz}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group controlId="pais">
								<Form.Label>País</Form.Label>
								<select
									name="pais"
									id="pais"
									value={selectedPais}
									onChange={handleChangePais}
								>
									<option value="">Seleccione un pais</option>
									{paises.map((pais) => (
										<option
											key={pais.id}
											value={pais.id}
										>
											{pais.nombre}
										</option>
									))}
								</select>
							</Form.Group>
							<Form.Group controlId="provincia">
								<Form.Label>Provincia</Form.Label>
								<select
									name="provincia"
									id="provincia"
									value={selectedProvincia}
									onChange={handleChangeProvincia}
									disabled={!selectedPais}
								>
									<option value="">Seleccione una provincia</option>
									{provincias.map((provincia) => (
										<option
											key={provincia.id}
											value={provincia.id}
										>
											{provincia.nombre}
										</option>
									))}
								</select>
							</Form.Group>
							<Form.Group controlId="localidad">
								<Form.Label>Localidad</Form.Label>
								<select
									name="localidad"
									id="localidad"
									value={selectedLocalidad}
									onChange={handleChangeLocalidad}
									disabled={!selectedProvincia}
								>
									<option value="">Seleccione una localidad</option>
									{localidades.map((localidad) => (
										<option
											key={localidad.id}
											value={localidad.id}
										>
											{localidad.nombre}
										</option>
									))}
								</select>
							</Form.Group>
							<Form.Group controlId="latitud">
								<Form.Label>Latitud</Form.Label>
								<Form.Control
									type="number"
									name="latitud"
									value={newSucursal.latitud}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="longitud">
								<Form.Label>Longitud</Form.Label>
								<Form.Control
									type="number"
									name="longitud"
									value={newSucursal.longitud}
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
									value={newSucursal.domicilio.calle}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="numero">
								<Form.Label>Número de la calle</Form.Label>
								<Form.Control
									type="number"
									name="numero"
									value={newSucursal.domicilio.numero}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="cp">
								<Form.Label>Código Postal</Form.Label>
								<Form.Control
									type="number"
									name="cp"
									value={newSucursal.domicilio.cp}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="piso">
								<Form.Label>Ingresa un número de piso</Form.Label>
								<Form.Control
									type="number"
									name="piso"
									value={newSucursal.domicilio.piso}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="nroDpto">
								<Form.Label>Ingresa un número de departamento</Form.Label>
								<Form.Control
									type="number"
									name="nroDpto"
									value={newSucursal.domicilio.nroDpto}
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
										value={newSucursal.logo || ""}
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
