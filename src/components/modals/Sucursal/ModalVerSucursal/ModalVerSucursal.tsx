import styles from "./ModalVerSucursal.module.css";
import { Button, Modal } from "react-bootstrap";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";

interface ModalVerSucursalProps {
	sucursal: ISucursal | null;
	show: boolean;
	onHide: () => void;
}

export const ModalVerSucursal: FC<ModalVerSucursalProps> = ({ sucursal, show, onHide }) => {
	if (!sucursal) return null;
	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title>{sucursal.nombre}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<p>apertura: {sucursal.horarioApertura}</p>
					<p>cierre: {sucursal.horarioCierre}</p>
					<p>Es casa Matriz?: {sucursal.esCasaMatriz}</p>
					{/* <p>pais: {sucursal.pais}</p>
					<p> provincia: {sucursal.provincia}</p>
					<p> localidad: {sucursal.localidad}</p> */}
					<p> latitud: {sucursal.latitud}</p>
					<p> longitud: {sucursal.longitud}</p>
					<p>calle: {sucursal.calle}</p>
					<p>numero: {sucursal.domicilio.numero}</p>
					<p> cp: {sucursal.domicilio.cp}</p>
					<p>piso: {sucursal.domicilio.piso}</p>
					<p>departamento: {sucursal.domicilio.nroDpto}</p>
					<p>imagen: {sucursal.logo}</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Cerrar</Button>
			</Modal.Footer>
		</Modal>
	);
};
