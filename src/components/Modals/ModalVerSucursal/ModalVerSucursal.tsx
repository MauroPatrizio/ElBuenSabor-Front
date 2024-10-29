import { Box, Typography } from "@mui/material";
import styles from "./ModalVerSucursal.module.css";
import { Modal } from "react-bootstrap";
import { ISucursal } from "../../../types/Sucursal";
import { FC } from "react";

interface ModalVerSucursalProps {
	sucursal: ISucursal | null;
	onClose: () => void;
}

export const ModalVerSucursal: FC<ModalVerSucursalProps> = ({ sucursal, onClose }) => {
	if (!sucursal) return null;
	return (
		<Modal>
			<Modal.Header>
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
		</Modal>
	);
};
