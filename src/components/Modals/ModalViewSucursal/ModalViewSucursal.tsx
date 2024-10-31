import { Box, Typography } from "@mui/material";
import styles from "./ModalViewSucursal.module.css";
import { Button, Modal } from "react-bootstrap";
import { ISucursal } from "../../../types/Sucursal";
import { FC } from "react";

interface ModalVerSucursalProps {
	sucursal: ISucursal;
	handleViewOpen: boolean;
	handleViewClose: () => void;
}

export const ModalViewSucursal: FC<ModalVerSucursalProps> = ({ sucursal, handleViewOpen, handleViewClose }) => {
	if (!sucursal) return null;
	return (
		<Modal show={handleViewOpen} onHide={handleViewClose} aria-labelledby="modal-title" className={styles["Modal"]} size="xl">
			<Modal.Header closeButton className={styles["modal-header"]}>
				<Modal.Title>{sucursal.nombre}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Box>
					<Typography>apertura: {sucursal.apertura}</Typography>
					<Typography>cierre: {sucursal.cierre}</Typography>
					<Typography>habilitado: {sucursal.habilitado}</Typography>
					<Typography>pais: {sucursal.pais}</Typography>
					<Typography> provincia: {sucursal.provincia}</Typography>
					<Typography> localidad: {sucursal.localidad}</Typography>
					<Typography> latitud: {sucursal.latitud}</Typography>
					<Typography> longitud: {sucursal.longitud}</Typography>
					<Typography>calle: {sucursal.calle}</Typography>
					<Typography>numero: {sucursal.numero}</Typography>
					<Typography> cp: {sucursal.cp}</Typography>
					<Typography>piso: {sucursal.piso}</Typography>
					<Typography>departamento: {sucursal.departamento}</Typography>
					<Typography>imagen: {sucursal.imagen}</Typography>
				</Box>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleViewClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
