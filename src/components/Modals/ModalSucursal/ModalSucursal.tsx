import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styles from "./ModalSucursal.module.css";
import { ISucursal } from "../../../types/Sucursal";

interface ModalSucursalProps {
	handleOpen: boolean;
	handleClose: () => void;
	onAddSucursal: (sucursal: ISucursal) => void;
}

const ModalSucursal: FC<ModalSucursalProps> = ({ handleOpen, handleClose, onAddSucursal }) => {
	const [habilitado, setHabilitado] = useState<boolean>(false);
	const [formData, setFormData] = useState<ISucursal>({
		nombre: "",
		apertura: "",
		cierre: "",
		habilitado: false,
		pais: "",
		provincia: "",
		localidad: "",
		latitud: "",
		longitud: "",
		calle: "",
		numero: "",
		cp: "",
		piso: "",
		departamento: "",
		imagen: "",
	});

	const [errors, setErrors] = useState({
		nombre: false,
		apertura: false,
		cierre: false,
		imagen: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name as keyof ISucursal]: value,
		});
	};

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name as keyof ISucursal]: value,
		});
	};

	const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, habilitado: e.target.checked });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const requiredErrors = {
			nombre: formData.nombre === "",
			apertura: formData.apertura === "",
			cierre: formData.cierre === "",
			imagen: formData.imagen === "",
		};

		setErrors(requiredErrors);

		if (Object.values(requiredErrors).some((error) => error)) {
			return;
		}
		onAddSucursal(formData);
		handleClose();
		setFormData({
			nombre: "",
			apertura: "",
			cierre: "",
			habilitado: false,
			pais: "",
			provincia: "",
			localidad: "",
			latitud: "",
			longitud: "",
			calle: "",
			numero: "",
			cp: "",
			piso: "",
			departamento: "",
			imagen: "",
		});
		setHabilitado(false);
	};

	return (
		<Modal show={handleOpen} onHide={handleClose} aria-labelledby="modal-title" className={styles["Modal-main"]} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Crear / Editar Sucursal</Modal.Title>
			</Modal.Header>
			<Modal.Body className={styles["Modal-body"]}>
				<Box component="form" onSubmit={handleSubmit} className={styles["Modal-box"]}>
					<div className={styles["div-column"]}>
						<TextField type="text" label="Ingresa un nombre" name="nombre" variant="outlined" error={errors.nombre} className={styles["time-textfield"]} onChange={handleChange} value={formData.nombre} />
						<TextField type="time" label="Horario de Apertura" className={styles["time-textfield"]} error={errors.apertura} onChange={handleChange} name="apertura" value={formData.apertura} InputLabelProps={{ shrink: true }} />
						<TextField type="time" label="Horario de Cierre" className={styles["time-textfield"]} name="cierre" onChange={handleChange} value={formData.cierre} InputLabelProps={{ shrink: true }} error={errors.cierre} />
						<div className={styles["div-checkbox"]}>
							<Checkbox checked={formData.habilitado} onChange={handleCheckChange} className={styles["checkbox"]} />
							<Typography>Habilitado</Typography>
						</div>
					</div>
					<div className={styles["div-column"]}>
						<div>
							<FormControl>
								<InputLabel>Selecciona un Pais</InputLabel>
								<Select name="pais" value={formData.pais} onChange={handleSelectChange}>
									<MenuItem value="Argentina">Argentina</MenuItem>
									<MenuItem value="Chile">Chile</MenuItem>
									<MenuItem value="Uruguay">Uruguay</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div>
							<FormControl>
								<InputLabel>Seleccione una provincia</InputLabel>
								<Select onChange={handleSelectChange} name="provincia" value={formData.provincia}>
									<MenuItem value="Mendoza">Mendoza</MenuItem>
									<MenuItem value="Catamarca">Catamarca Aires</MenuItem>
									<MenuItem value="Catamarca">Cordoba</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div>
							<FormControl>
								<InputLabel>Seleccione una localidad</InputLabel>
								<Select name="localidad" value={formData.localidad} onChange={handleSelectChange}>
									<MenuItem value="Tunuyan">Tunuyan</MenuItem>
									<MenuItem value="Tupungato">Tupungato</MenuItem>
									<MenuItem value="Guaymallen">Guaymallen</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div>
							<TextField type="text" label="Latitud" variant="outlined" name="latitud" value={formData.latitud} onChange={handleChange} />
						</div>
						<div>
							<TextField type="text" label="Longitud" variant="outlined" name="longitud" value={formData.longitud} onChange={handleChange} />
						</div>
					</div>
					<div className={styles["div-column"]}>
						<TextField type="text" label="Nombre de la calle" variant="outlined" name="calle" value={formData.calle} onChange={handleChange} />
						<TextField type="text" label="Número de la calle" variant="outlined" name="numero" value={formData.numero} onChange={handleChange} />
						<TextField type="number" label="Código postal" variant="outlined" name="cp" value={formData.cp} onChange={handleChange} />
						<TextField type="number" label="Ingresa un número de piso" variant="outlined" name="piso" value={formData.piso} onChange={handleChange} />
						<TextField type="number" label="Ingresa un número de departamento" variant="outlined" name="departamento" value={formData.departamento} onChange={handleChange} />
					</div>
				</Box>
				<div className={styles["div-imagen"]}>
					<TextField type="text" label="Ingresa la url de la imagen" variant="outlined" name="imagen" value={formData.imagen} onChange={handleChange} error={errors.imagen} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button variant="outline-warning" onClick={handleClose}>
						CANCELAR
					</Button>
					<Button type="submit" variant="outline-success" onClick={handleSubmit}>
						Enviar
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalSucursal;
