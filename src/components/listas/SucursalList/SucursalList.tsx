//Lista de sucursales
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import styles from "./SucursalList.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { FC } from "react";

interface ISucursalListProps {
	sucursales: ISucursal[];
	onSuccess: () => void;
}

export const SucursalList: FC<ISucursalListProps> = ({ sucursales, onSuccess }) => {
	return (
		<div className={styles["div-main"]}>
			<div className={styles["div-lista"]}>
				{sucursales.length > 0 ? (
					sucursales.map((sucursal: ISucursal) => (
						<SucursalCard
							key={sucursal.id}
							sucursal={sucursal}
							onSuccess={onSuccess}
						/>
					))
				) : (
					<h3>No hay sucursales disponibles</h3>
				)}
			</div>
		</div>
	);
};
