import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { sucursalService } from "../../../../services/sucursalService";
import Swal from "sweetalert2";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import { paisService } from "../../../../services/paisService";
import { provinciaService } from "../../../../services/provinciaService";
import { localidadService } from "../../../../services/localidadService";
import { IUpdateSucursal } from "../../../../types/dtos/sucursal/IUpdateSucursal";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import styles from "./ModalEditarSucursal.module.css";

interface IModalEditarSucursalProps {
	show: boolean;
	onHide: () => void;
	sucursal: ISucursal;
}

const ModalEditarSucursal: FC<IModalEditarSucursalProps> = ({ show, onHide, sucursal }) => {
	const [formData, setFormData] = useState<IUpdateSucursal>({
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
		categorias: sucursal.categorias || [],
		esCasaMatriz: sucursal.esCasaMatriz || false,
		horarioApertura: sucursal.horarioApertura || "",
		horarioCierre: sucursal.horarioCierre || "",
		id: sucursal.id,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		setFormData((prev) => {
			if (name in prev.domicilio) {
				return {
					...prev,
					domicilio: {
						...prev.domicilio,
						[name]: type === "number" ? (value === "" ? "" : parseInt(value)) : value,
					},
				};
			}
			return {
				...prev,
				[name]: type === "number" ? (value === "" ? "" : parseFloat(value)) : value,
			};
		});
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		try {
			await sucursalService.updateSucursal(formData.id, formData);

			Swal.fire({
				icon: "success",
				title: "Sucursal Actualizada",
				showCancelButton: false,
				timer: 1800,
				didClose: () => {
					window.location.reload();
				},
			});
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "No se pudo actualizar la sucursal",
				showCloseButton: true,
			});
		}
	};

	const [paises, setPaises] = useState<IPais[]>([]);
	const [provincias, setProvincias] = useState<IProvincia[]>([]);
	const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

	const [selectedPais, setSelectedPais] = useState(
		sucursal.domicilio.localidad.provincia.pais.id
	);
	const [selectedProvincia, setSelectedProvincia] = useState(
		sucursal.domicilio.localidad.provincia.id
	);
	const [selectedLocalidad, setSelectedLocalidad] = useState(sucursal.domicilio.localidad.id);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const paisesData = await paisService.getAllPaises();
				setPaises(paisesData.sort((a, b) => a.nombre.localeCompare(b.nombre)));

				if (selectedPais) {
					const provinciasData = await provinciaService.getAllProvincias(
						Number(selectedPais)
					);
					setProvincias(provinciasData.sort((a, b) => a.nombre.localeCompare(b.nombre)));
				}

				if (selectedProvincia) {
					const localidadData = await localidadService.getAllLocalidades(
						Number(selectedProvincia)
					);
					setLocalidades(localidadData.sort((a, b) => a.nombre.localeCompare(b.nombre)));
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [selectedPais, selectedProvincia]);

	const handleChangePais = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedPais(parseInt(e.target.value));
		setSelectedProvincia(NaN);
		setSelectedLocalidad(NaN);
	}, []);

	const handleChangeProvincia = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedProvincia(parseInt(e.target.value));
		setSelectedLocalidad(NaN);
	};

	const handleChangeLocalidad = (e: ChangeEvent<HTMLSelectElement>) => {
		const idLocalidad = parseInt(e.target.value);
		setSelectedLocalidad(parseInt(e.target.value));

		setFormData((prev) => ({
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
				<Modal.Title>Editar Sucursal</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles["Modal-body"]}>
				<Form>
					<Row>
						<Col md={4}>
							<Form.Group controlId="nombre">
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									name="nombre"
									onChange={handleChange}
									value={formData.nombre}
								/>
							</Form.Group>
							<Form.Group controlId="horarioApertura">
								<Form.Label>Horario de Apertura</Form.Label>
								<Form.Control
									type="time"
									name="horarioApertura"
									onChange={handleChange}
									value={formData.horarioApertura}
								/>
							</Form.Group>
							<Form.Group controlId="horarioCierre">
								<Form.Label>Horario de Cierre</Form.Label>
								<Form.Control
									type="time"
									name="horarioCierre"
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
									name="esCasaMatriz"
									checked={formData.esCasaMatriz}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group controlId="pais">
								<Form.Label>País</Form.Label>
								<Form.Select
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
								</Form.Select>
							</Form.Group>
							<Form.Group controlId="provincia">
								<Form.Label>Provincia</Form.Label>
								<Form.Select
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
								</Form.Select>
							</Form.Group>
							<Form.Group controlId="localidad">
								<Form.Label>Localidad</Form.Label>
								<Form.Select
									name="localidad"
									id="localidad"
									value={selectedLocalidad}
									onChange={handleChangeLocalidad}
									disabled={!selectedProvincia}
									className={styles["select-modal"]}
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
								</Form.Select>
							</Form.Group>
							<Form.Group controlId="latitud">
								<Form.Label>Latitud</Form.Label>
								<Form.Control
									type="number"
									name="latitud"
									value={formData.latitud}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group controlId="longitud">
								<Form.Label>Longitud</Form.Label>
								<Form.Control
									type="number"
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
									type="number"
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
							<Form.Group controlId="nroDpto">
								<Form.Label>Ingresa un número de departamento</Form.Label>
								<Form.Control
									type="number"
									name="nroDpto"
									value={formData.domicilio.nroDpto}
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
										value={formData.logo || ""}
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

export default ModalEditarSucursal;
