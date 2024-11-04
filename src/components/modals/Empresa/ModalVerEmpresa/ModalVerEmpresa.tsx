import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { Button, Modal } from "react-bootstrap";
import styles from "./ModalVerEmpresa.module.css";

interface IModalVerEmpresaProps {
	empresa: IEmpresa;
	show: boolean;
	onHide: () => void;
}

export const ModalVerEmpresa: FC<IModalVerEmpresaProps> = ({ empresa, show, onHide }) => {
	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
				backdrop="static"
			>
				<Modal.Header>
					<Modal.Title>{empresa.nombre}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Razon Social: {empresa.razonSocial} </p>
					<p>CUIT: {empresa.cuit} </p>
					<p>Imagen: {empresa.logo} </p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onHide}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
