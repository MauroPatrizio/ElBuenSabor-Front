import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { sucursalService } from "../../../../services/sucursalService";
import Swal from "sweetalert2";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
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
	const [formData, setFormData] = useState<ICreateSucursal>({
		nombre: "",
		horarioApertura: "",
		horarioCierre: "",
		esCasaMatriz: false,
		latitud: parseInt(""),
		longitud: parseInt(""),
		domicilio: {
			calle: "",
			numero: parseInt(""),
			cp: parseInt(""),
			piso: parseInt(""),
			nroDpto: parseInt(""),
			idLocalidad: parseInt(""),
		},
		idEmpresa: idEmpresa,
		logo: "",
	});

	const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

	const formValidar = () => {
		const errors: { [key: string]: string } = {};

		if (!formData.nombre) errors.nombre = "Campo obligatorio.";
		if (!formData.horarioApertura) errors.horarioApertura = "Campo obligatorio.";
		if (!formData.horarioCierre) errors.horarioCierre = "Campo obligatorio.";
		if (!selectedPais) errors.pais = "Campo obligatorio";
		if (!selectedProvincia) errors.provincia = "Campo obligatorio";
		if (!selectedLocalidad) errors.localidad = "Campo obligatorio";

		return errors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setFormData((prev) => {
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
			await sucursalService.createSucursal(formData);

			Swal.fire({
				icon: "success",
				title: "Sucursal Creada",
				showCancelButton: false,
				timer: 1000,
				didClose: () => {
					window.location.reload();
				},
			});

			setFormErrors({});
		} catch (e) {
			console.error(e);
			Swal.fire({
				icon: "error",
				title: "No se pudo cargar la sucursal",
				showCloseButton: true,
			});
		}
	};

	const [paises, setPaises] = useState<IPais[]>([]);
	const [provincias, setProvincias] = useState<IProvincia[]>([]);
	const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

	const [selectedPais, setSelectedPais] = useState<string>("");
	const [selectedProvincia, setSelectedProvincia] = useState<string>("");
	const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");

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
		const selectedValue = e.target.value;
		setSelectedPais(selectedValue);
		setSelectedProvincia("");
		setSelectedLocalidad("");

		setFormErrors((prevErrors) => {
			const { pais, ...restErrors } = prevErrors;
			return e.target.value ? restErrors : { ...prevErrors, pais: "Seleccione un pais" };
		});
	}, []);

	const handleChangeProvincia = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setSelectedProvincia(selectedValue);
		setSelectedLocalidad("");

		setFormErrors((prevErrors) => {
			const { provincia, ...restErrors } = prevErrors;
			return e.target.value
				? restErrors
				: { ...prevErrors, provincia: "Seleccione una provincia" };
		});
	};

	const handleChangeLocalidad = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		const idLocalidad = parseInt(selectedValue);
		setSelectedLocalidad(selectedValue);

		setFormData((prev) => ({
			...prev,
			domicilio: {
				...prev.domicilio,
				idLocalidad: idLocalidad,
			},
		}));

		setFormErrors((prevErrors) => {
			const { localidad, ...restErrors } = prevErrors;
			return e.target.value
				? restErrors
				: { ...prevErrors, localidad: "Seleccione una localidad" };
		});
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="modal-title"
			size="xl"
			centered
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title>Crear Sucursal</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Col md={4}>
							<Form.Group
								controlId="nombre"
								className="mb-3"
							>
								<FloatingLabel
									controlId="floatingInput"
									label="Nombre"
									className="mb-3"
								>
									<Form.Control
										type="text"
										name="nombre"
										onChange={handleChange}
										value={formData.nombre}
										isInvalid={!!formErrors.nombre}
									/>
									<Form.Control.Feedback type="invalid">
										{formErrors.nombre}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="horarioApertura"
								className="mb-3"
							>
								<FloatingLabel
									controlId="floatingInput"
									label="Apertura"
									className="mb-3"
								>
									<Form.Control
										type="time"
										name="horarioApertura"
										onChange={handleChange}
										value={formData.horarioApertura}
										isInvalid={!!formErrors.horarioApertura}
									/>
									<Form.Control.Feedback type="invalid">
										{formErrors.horarioApertura}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="horarioCierre"
								className="mb-3"
							>
								<FloatingLabel label="Cierre">
									<Form.Control
										type="time"
										name="horarioCierre"
										onChange={handleChange}
										value={formData.horarioCierre}
										isInvalid={!!formErrors.horarioCierre}
									/>
									<Form.Control.Feedback type="invalid">
										{formErrors.horarioCierre}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="esCasaMatriz"
								className="mb-3"
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
							<Form.Group
								controlId="pais"
								className="mb-3"
							>
								<FloatingLabel label="Pais">
									<Form.Select
										name="pais"
										id="pais"
										value={selectedPais}
										onChange={handleChangePais}
										isInvalid={!!formErrors.pais}
									>
										<option value="">Abrir el menú</option>
										{paises.map((pais) => (
											<option
												key={pais.id}
												value={pais.id}
											>
												{pais.nombre}
											</option>
										))}
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formErrors.pais}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="provincia"
								className="mb-3"
							>
								<FloatingLabel label="Provincia">
									<Form.Select
										name="provincia"
										id="provincia"
										value={selectedProvincia}
										onChange={handleChangeProvincia}
										disabled={!selectedPais}
										isInvalid={!!formErrors.provincia}
									>
										<option value="">Abrir el menú</option>
										{provincias.map((provincia) => (
											<option
												key={provincia.id}
												value={provincia.id}
											>
												{provincia.nombre}
											</option>
										))}
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formErrors.provincia}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="localidad"
								className="mb-3"
							>
								<FloatingLabel label="Localidad">
									<Form.Select
										name="localidad"
										id="localidad"
										value={selectedLocalidad}
										onChange={handleChangeLocalidad}
										disabled={!selectedProvincia}
										isInvalid={!!formErrors.localidad}
									>
										<option value="">Abrir el Menú</option>
										{localidades.map((localidad) => (
											<option
												key={localidad.id}
												value={localidad.id}
											>
												{localidad.nombre}
											</option>
										))}
									</Form.Select>
									<Form.Control.Feedback type="invalid">
										{formErrors.localidad}
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="latitud"
								className="mb-3"
							>
								<FloatingLabel label="Latitud">
									<Form.Control
										type="number"
										name="latitud"
										value={formData.latitud}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="longitud"
								className="mb-3"
							>
								<FloatingLabel label="Longitud">
									<Form.Control
										type="number"
										name="longitud"
										value={formData.longitud}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group
								controlId="calle"
								className="mb-3"
							>
								<FloatingLabel label="Nombre de la calle">
									<Form.Control
										type="text"
										name="calle"
										value={formData.domicilio.calle}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="numero"
								className="mb-3"
							>
								<FloatingLabel label="Número de la calle">
									<Form.Control
										type="number"
										name="numero"
										value={formData.domicilio.numero}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="cp"
								className="mb-3"
							>
								<FloatingLabel label="Código Postal">
									<Form.Control
										type="number"
										name="cp"
										value={formData.domicilio.cp}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="piso"
								className="mb-3"
							>
								<FloatingLabel label="Piso">
									<Form.Control
										type="number"
										name="piso"
										value={formData.domicilio.piso}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group
								controlId="nroDpto"
								className="mb-3"
							>
								<FloatingLabel label="Departamento">
									<Form.Control
										type="number"
										name="nroDpto"
										value={formData.domicilio.nroDpto}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col
							md={9}
							className="d-flex align-items-center"
						>
							<Form.Group
								controlId="imagen"
								className="w-100"
							>
								<FloatingLabel label="Ingresa la URL de la imagen">
									<Form.Control
										type="text"
										name="logo"
										value={formData.logo || ""}
										onChange={handleChange}
									/>
								</FloatingLabel>
							</Form.Group>
						</Col>
						<Col
							md={3}
							className="d-flex justify-content-center align-items-center"
						>
							<img
								src={formData.logo || ""}
								style={{ maxWidth: "100%", height: "auto" }}
							/>
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
