import { useEffect, useState } from "react";
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import styles from "./SucursalList.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { sucursalService } from "../../../services/sucursalService";

export const SucursalList = () => {
	const selectedEmpresa = useSelector((state: RootState) => state.empresa.selectedEmpresa);

	const idEmpresa = selectedEmpresa?.id;

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);

	useEffect(() => {
		if (idEmpresa) {
			sucursalService.getAllSucursales(idEmpresa).then((data: ISucursal[]) => {
				setSucursales(data);
			});
		}
	}, [idEmpresa]);

	return (
		<div className={styles["div-main"]}>
			<div className={styles["div-lista"]}>
				{sucursales.length > 0 ? (
					sucursales.map(
						(sucursal) => (
							<SucursalCard
								key={sucursal.id}
								sucursal={sucursal}
							/>
						),
						console.log(sucursales)
					)
				) : (
					<h3>{`La empresa ${selectedEmpresa?.nombre} no tiene sucursales en este momento`}</h3>
				)}
			</div>
		</div>
	);
};
