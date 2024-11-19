import { RootState } from "../../../redux/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import styles from "./ViewSucursales.module.css";
import { Button } from "react-bootstrap";
import ModalCrearEditarSucursal from "../../modals/Sucursal/ModalCrearSucursal/ModalCrearEditarSucursal";
import { SucursalList } from "../../listas/SucursalList/SucursalList";

export const ViewSucursales = () => {
	const selectedEmpresa = useSelector((state: RootState) => state.empresa.selectedEmpresa);

	const idEmpresa = selectedEmpresa?.id;

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);

	const [openCrearSucursal, setOpenCrearSucursal] = useState(false);

	const handleOpen = () => setOpenCrearSucursal(true);
	const handleClose = () => setOpenCrearSucursal(false);

	return (
		<div className={styles["div-main"]}>
			<div className={styles["div-title"]}>
				<h3 style={{ color: "#2F4156" }}>
					<b>
						{selectedEmpresa
							? `Sucursales de ${selectedEmpresa.nombre}`.toUpperCase()
							: "SUCURSALES"}
					</b>
				</h3>
				<div style={{ margin: "1.5rem" }}>
					{selectedEmpresa ? (
						<Button
							onClick={handleOpen}
							style={{ backgroundColor: "#567C8D", borderColor: "#567C8D" }}
						>
							Agregar Sucursal
						</Button>
					) : null}
				</div>
			</div>

			<SucursalList />

			{openCrearSucursal && (
				<>
					<ModalCrearEditarSucursal
						show={openCrearSucursal}
						onHide={handleClose}
						idEmpresa={selectedEmpresa?.id ?? 0}
					/>
				</>
			)}
		</div>
	);
};
