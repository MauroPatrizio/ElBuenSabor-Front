import { FC } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { Button, Modal } from "react-bootstrap";

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
				<Modal.Header
					closeButton
					style={{ backgroundColor: "#567C8D", color: "#fff" }}
				>
					<Modal.Title
						className="text-center w-100"
						style={{ fontSize: "1.5rem" }}
					>
						{empresa.nombre}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<b>Razon Social:</b> {empresa.razonSocial}{" "}
					</p>
					<p>
						<b>CUIT:</b> {empresa.cuit}{" "}
					</p>
					<div style={{ overflow: "auto" }}>
						<p style={{ overflowWrap: "anywhere" }}>
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
