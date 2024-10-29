import { FC } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/Sucursal";

interface SucursalCardProps {
	sucursal: ISucursal;
	onViewClick: () => void; 
}

const SucursalCard: FC<SucursalCardProps> = ({ sucursal }) => {
	return (
		<div className={styles["div-card"]}>
			<Card className={styles["card-main"]}>
				<Card.Body className={styles["card-body"]}>
					<Card.Title>{sucursal.nombre}</Card.Title>
					<Card.Text>
						Apertura: {sucursal.apertura} - {sucursal.cierre} <br />
					</Card.Text>
					<Card.Img variant="top" src={sucursal.imagen} />
					<div className={styles["buttons"]}>
						{/* boton administracion */}
						<Button variant="outline-primary">
							<span className="material-symbols-outlined">apartment</span>
						</Button>
						{/* boton editar */}
						<Button variant="outline-warning">
							<span className="material-symbols-outlined">edit</span>
						</Button>
						{/* Boton ver */}
						<Button variant="outline-success">
							<span className="material-symbols-outlined">visibility</span>
						</Button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default SucursalCard;
