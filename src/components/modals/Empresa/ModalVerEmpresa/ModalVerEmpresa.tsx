import { FC, useEffect } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { Button, Modal } from "react-bootstrap";
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
			>
				<Modal.Header closeButton>
					<Modal.Title>{empresa.nombre}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<b>Razon Social:</b> {empresa.razonSocial}{" "}
					</p>
					<p>
						<b>CUIT:</b> {empresa.cuit}{" "}
					</p>
					<div style={{ overflow: "auto" }}>
						<p style={{ overflowWrap: "break-word" }}>
							<b>Imagen:</b> {empresa.logo}{" "}
						</p>
					</div>

					<div className="d-flex justify-content-center align-items-center">
						{empresa.logo ? (
							<img
								src={empresa.logo || ""}
								style={{ maxWidth: "15rem", height: "15rem" }}
							/>
						) : null}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onHide}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
