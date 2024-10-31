import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./SucursalCard.module.css";
import { ISucursal } from "../../../types/Sucursal";
import ModalSucursal from "../../Modals/ModalSucursal/ModalSucursal";
import { ModalViewSucursal } from "../../Modals/ModalViewSucursal/ModalViewSucursal";

interface SucursalCardProps {
	sucursal: ISucursal;
	show: () => void;
}

const SucursalCard: FC<SucursalCardProps> = ({ sucursal }) => {
	const [open, setOpen] = useState(false);
	const [viewOpen, setViewOpen] = useState(false);
	const [sucursalTemporal, setSucursalTemporal] = useState<ISucursal>(sucursal);

	const handleOpen = () => {
		setSucursalTemporal(sucursal);
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const handleViewOpen = () => setViewOpen(true);
	const handleViewClose = () => setViewOpen(false);

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);
	const handleAddSucursal = (sucursal: ISucursal) => {
		const nuevaSucursal = { ...sucursal, id: sucursales.length };
		setSucursales([...sucursales, nuevaSucursal]);
	};
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
						<Button variant="outline-warning" onClick={handleOpen}>
							<span className="material-symbols-outlined">edit</span>
						</Button>
						{/* Boton ver */}
						<Button variant="outline-success" onClick={handleViewOpen}>
							<span className="material-symbols-outlined">visibility</span>
						</Button>
					</div>
				</Card.Body>
			</Card>
			{/* Modal Edit */}
			<ModalSucursal handleOpen={open} handleClose={handleClose} onAddSucursal={handleAddSucursal} isEdit={true} dataSucursal={sucursal} />

			{/* Modal View */}
			<ModalViewSucursal sucursal={sucursal} handleViewOpen={viewOpen} handleViewClose={handleViewClose} />
		</div>
	);
};

export default SucursalCard;
