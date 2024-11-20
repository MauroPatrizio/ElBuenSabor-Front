//ViewSucursales
import { RootState } from "../../../redux/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ViewSucursales.module.css";
import { Button } from "react-bootstrap";
import ModalCrearEditarSucursal from "../../modals/Sucursal/ModalCrearSucursal/ModalCrearEditarSucursal";
import { SucursalList } from "../../listas/SucursalList/SucursalList";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { sucursalService } from "../../../services/sucursalService";

export const ViewSucursales = () => {
	const selectedEmpresa = useSelector((state: RootState) => state.empresa.selectedEmpresa);

	const [openCrearSucursal, setOpenCrearSucursal] = useState(false);

	const handleOpen = () => setOpenCrearSucursal(true);
	const handleClose = () => setOpenCrearSucursal(false);

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);

	const idEmpresa = selectedEmpresa?.id ?? 0;

	const loadSucursales = async () => {
		try {
			const sucursalesData = await sucursalService.getAllSucursales(idEmpresa);
			setSucursales(sucursalesData);
		} catch (e) {
			console.error("Error al cargar las sucursales", e);
		}
	};

	useEffect(() => {
		if (idEmpresa) {
			loadSucursales();
		}
	}, [idEmpresa]);
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

			<SucursalList
				sucursales={sucursales}
				onSuccess={loadSucursales}
			/>

			{openCrearSucursal && (
				<>
					<ModalCrearEditarSucursal
						show={openCrearSucursal}
						onHide={handleClose}
						idEmpresa={selectedEmpresa?.id ?? 0}
						onSuccess={loadSucursales}
					/>
				</>
			)}
		</div>
	);
};
