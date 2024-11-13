import { FC, useEffect } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { Button, Modal } from "react-bootstrap";
import styles from "./ModalVerEmpresa.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store/store";
import { toggleGlobalStyle } from "../../../../redux/slices/globalStylesSlice";

interface IModalVerEmpresaProps {
	empresa: IEmpresa;
	show: boolean;
	onHide: () => void;
}

export const ModalVerEmpresa: FC<IModalVerEmpresaProps> = ({ empresa, show, onHide }) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (show) {
			dispatch(toggleGlobalStyle(true));
		} else {
			dispatch(toggleGlobalStyle(false));
		}

		return () => {
			dispatch(toggleGlobalStyle(false));
		};
	}, [show, dispatch]);

	return (
		<>
			<Modal
				show={show}
				onHide={onHide}
				centered
				backdrop="static"
				className={styles["modal"]}
			>
				<Modal.Header
					className={styles["modal-header"]}
					closeButton
				>
					<Modal.Title className={styles["modal-title"]}>{empresa.nombre}</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles["modal-body"]}>
					<p>Razon Social: {empresa.razonSocial} </p>
					<p>CUIT: {empresa.cuit} </p>
					<p>Imagen: {empresa.logo} </p>
				</Modal.Body>
				<Modal.Footer className={styles["modal-footer"]}>
					<Button onClick={onHide}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
