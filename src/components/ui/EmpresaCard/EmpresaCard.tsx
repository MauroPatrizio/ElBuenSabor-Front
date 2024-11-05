import { Button, Card } from "react-bootstrap";
import style from "./EmpresaCard.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedEmpresa } from "../../../redux/slices/empresaSlice";
import { ModalVerEmpresa } from "../../modals/Empresa/ModalVerEmpresa/ModalVerEmpresa";
import { ModalEditarEmpresa } from "../../modals/Empresa/ModalEditarEmpresa/ModalEditarEmpresa";

interface EmpresaCardProps {
	dato: IEmpresa;
}

const EmpresaCard: React.FC<EmpresaCardProps> = ({ dato }) => {
	const [openViewModal, setOpenViewModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	//handle Ver
	const handleOpenViewModal = () => setOpenViewModal(true);
	const handleCloseViewModal = () => setOpenViewModal(false);

	//handle Edit
	const handleOpenEditModal = () => setOpenEditModal(true);
	const handleCloseEditModal = () => setOpenEditModal(false);

	const dispatch = useDispatch();

	const handleSelectEmpresa = () => {
		dispatch(setSelectedEmpresa(dato));
	};

	return (
		<div>
			<Card
				className={style["card-container"]}
				onClick={handleSelectEmpresa}
			>
				<Card.Header>
					<Card.Title className="d-flex justify-content-center text-center">
						{dato.nombre}
					</Card.Title>
				</Card.Header>
				<Card.Body className={style["card-body"]}>
					<Card.Img
						src={dato.logo ? dato.logo : ""}
						style={{ maxWidth: "14.9rem", maxHeight: "14.5rem" }}
					></Card.Img>
					<div className={style["button-ontainer"]}>
						{/* Boton Ver */}
						<Button
							onClick={handleOpenViewModal}
							variant="outline-success"
						>
							<span className="material-symbols-outlined">visibility</span>
						</Button>
						{/* Botón Editar */}
						<Button
							onClick={handleOpenEditModal}
							variant="outline-warning"
						>
							<span className="material-symbols-outlined">edit</span>
						</Button>
					</div>
				</Card.Body>
			</Card>
			{/* Modal ver */}
			{openViewModal && (
				<div>
					<ModalVerEmpresa
						empresa={dato}
						show={openViewModal}
						onHide={handleCloseViewModal}
					></ModalVerEmpresa>
				</div>
			)}

			{/* Modal Editar */}
			{openEditModal && (
				<div>
					<ModalEditarEmpresa
						empresa={dato}
						show={openEditModal}
						onHide={handleCloseEditModal}
					/>
				</div>
			)}
		</div>
	);
};

export default EmpresaCard;
