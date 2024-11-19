import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ModalVerSucursal } from "../../modals/Sucursal/ModalVerSucursal/ModalVerSucursal";
import ModalCrearEditarSucursal from "../../modals/Sucursal/ModalCrearSucursal/ModalCrearEditarSucursal";

interface SucursalCardProps {
	sucursal: ISucursal;
}

const SucursalCard: FC<SucursalCardProps> = ({ sucursal }) => {
	const [viewOpen, setViewOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const navigate = useNavigate(); // Hook para navegación

	const handleViewOpen = () => setViewOpen(true);
	const handleViewClose = () => setViewOpen(false);

	const handleEditOpen = () => setEditOpen(true);
	const handleEditClose = () => setEditOpen(false);

	// Función para manejar la redirección al hacer clic en el botón de administración
	const handleAdminRedirect = (nombre: string) => {
		navigate("/admin", { state: { branchName: nombre } }); // Ajusta la ruta si necesitas parámetros adicionales y envia el nombre de la sucursal
	};

	function conversorTiempo(time: string): string {
		if (time) {
			return time.slice(0, 5);
		}
		return "";
	}

	return (
		<div className={styles["div-card"]}>
			<Card className={styles["card-main"]}>
				<Card.Header style={{ overflow: "auto" }}>
					<Card.Title
						className="d-flex justify-content-center text-center"
						style={{ overflowWrap: "anywhere" }}
					>
						{sucursal.nombre.toUpperCase()}
					</Card.Title>
				</Card.Header>
				<Card.Body className={styles["card-body"]}>
					<Card.Text>
						Horario: {conversorTiempo(sucursal.horarioApertura)} {" - "}
						{conversorTiempo(sucursal.horarioCierre)} <br />
					</Card.Text>
					<Card.Img
						style={{ maxHeight: "15rem", maxWidth: "15rem" }}
						variant="top"
						src={
							sucursal.logo ||
							"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
						}
					/>
					<div className={styles["buttons"]}>
						{/* botón de administración */}
						<Button
							variant="outline-primary"
							onClick={() => handleAdminRedirect(sucursal.nombre)} // Llama a la función al hacer clic
						>
							<span className="material-symbols-outlined">apartment</span>
						</Button>
						{/* botón editar */}
						<Button
							variant="outline-warning"
							onClick={handleEditOpen}
						>
							<span className="material-symbols-outlined">edit</span>
						</Button>
						{/* Botón ver */}
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
			<ModalCrearEditarSucursal
				show={editOpen}
				onHide={handleEditClose}
				sucursal={sucursal}
				idEmpresa={sucursal.empresa.id}
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
