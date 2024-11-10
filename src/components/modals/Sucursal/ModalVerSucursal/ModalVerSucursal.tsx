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
			<Modal.Header
				closeButton
				style={{ display: "flex", justifyContent: "center" }}
			>
				<Modal.Title>{sucursal.nombre}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div>
					<p>
						<b>Apertura:</b> {sucursal.horarioApertura}
					</p>
					<p>
						<b>Cierre:</b> {sucursal.horarioCierre}
					</p>
					<p>
						<b>¿Es casa Matriz?:</b> {sucursal.esCasaMatriz ? "Si" : "No"}
					</p>
					<p>
						<b>Pais:</b> {sucursal.domicilio.localidad.provincia.pais.nombre}
					</p>
					<p>
						{" "}
						<b>Provincia:</b> {sucursal.domicilio.localidad.provincia.nombre}
					</p>
					<p>
						{" "}
						<b>Localidad:</b> {sucursal.domicilio.localidad.nombre}
					</p>
					<p>
						<b>Latitud:</b> {sucursal.latitud}
					</p>
					<p>
						<b>Longitud:</b> {sucursal.longitud}
					</p>
					<p>
						<b>Calle:</b> {sucursal.domicilio.calle}
					</p>
					<p>
						<b>Numero:</b> {sucursal.domicilio.numero}
					</p>
					<p>
						<b>CP:</b> {sucursal.domicilio.cp}
					</p>
					<p>
						<b>Piso:</b> {sucursal.domicilio.piso}
					</p>
					<p>
						<b>Departamento:</b> {sucursal.domicilio.nroDpto}
					</p>

					<p style={{ display: "flex", flexDirection: "column" }}>
						<b>Logo:</b>
						<img
							src={sucursal.logo}
							style={{ width: "10rem" }}
						/>
					</p>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Cerrar</Button>
			</Modal.Footer>
		</Modal>
	);
};
