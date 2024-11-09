import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ModalVerSucursal } from "../../modals/Sucursal/ModalVerSucursal/ModalVerSucursal";
import ModalEditarSucursal from "../../modals/Sucursal/ModalEditarSucursal/ModalEditarSucursal";

interface SucursalCardProps {
	sucursal: ISucursal;
}

const SucursalCard: FC<SucursalCardProps> = ({ sucursal }) => {
	const [viewOpen, setViewOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);

	const handleViewOpen = () => setViewOpen(true);
	const handleViewClose = () => setViewOpen(false);

	const handleEditOpen = () => setEditOpen(true);
	const handleEditClose = () => setEditOpen(false);

	return (
		<div className={styles["div-card"]}>
			<Card className={styles["card-main"]}>
				<Card.Body className={styles["card-body"]}>
					<Card.Title>{sucursal.nombre}</Card.Title>
					<Card.Text>
						Apertura: {sucursal.horarioApertura} - {sucursal.horarioCierre} <br />
					</Card.Text>
					<Card.Img
						style={{ maxHeight: "15rem", maxWidth: "14.9rem" }}
						variant="top"
						src={sucursal.logo || ""}
					/>
					<div className={styles["buttons"]}>
						{/* boton administracion */}
						<Button variant="outline-primary">
							<span className="material-symbols-outlined">apartment</span>
						</Button>
						{/* boton editar */}
						<Button
							variant="outline-warning"
							onClick={handleEditOpen}
						>
							<span className="material-symbols-outlined">edit</span>
						</Button>
						{/* Boton ver */}
						<Button
							variant="outline-success"
							onClick={handleViewOpen}
						>
							<span className="material-symbols-outlined">visibility</span>
						</Button>
					</div>
				</Card.Body>
			</Card>
			{/* Modal Edit */}
			<ModalEditarSucursal
				show={editOpen}
				onHide={handleEditClose}
				sucursal={sucursal}
			/>

			{/* Modal View */}
			<ModalVerSucursal
				sucursal={sucursal}
				show={viewOpen}
				onHide={handleViewClose}
			/>
		</div>
	);
};

export default SucursalCard;
