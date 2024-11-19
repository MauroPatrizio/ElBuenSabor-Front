import { RootState } from "../../../redux/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { BASE_URL_SUCURSALES } from "../../../services/sucursalService";
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import styles from "./ViewSucursales.module.css";
import { Button } from "react-bootstrap";
import ModalCrearEditarSucursal from "../../modals/Sucursal/ModalCrearSucursal/ModalCrearEditarSucursal";

export const ViewSucursales = () => {
	const selectedEmpresa = useSelector((state: RootState) => state.empresa.selectedEmpresa);

	const idEmpresa = selectedEmpresa?.id;

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);

	const [openCrearSucursal, setOpenCrearSucursal] = useState(false);

	const handleOpen = () => setOpenCrearSucursal(true);
	const handleClose = () => setOpenCrearSucursal(false);

	useEffect(() => {
		if (selectedEmpresa) {
			fetch(`${BASE_URL_SUCURSALES}/porEmpresa/${idEmpresa}`)
				.then((response) => {
					if (!response.ok) {
						console.error("No se pudo obtener las sucursales");
					}
					return response.json();
				})
				.then((datos: ISucursal[]) => {
					setSucursales(datos);
				});
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
			<div className={styles["div-lista"]}>
				{selectedEmpresa ? (
					sucursales.length > 0 ? (
						sucursales.map((sucursal) => (
							<SucursalCard
								key={sucursal.id}
								sucursal={sucursal}
							/>
						))
					) : (
						<h3>{`No hay sucursales de ${selectedEmpresa.nombre}`} </h3>
					)
				) : (
					<h3>Seleccione una empresa para ver sus sucursales</h3>
				)}
			</div>
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
