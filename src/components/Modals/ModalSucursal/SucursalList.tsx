import { FC, useState } from "react";
import ModalSucursal from "./ModalSucursal";
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import { ISucursal } from "../../../types/Sucursal";

interface SucursalListProps {
	sucursales: ISucursal[];
}

export const SucursalList: FC<SucursalListProps> = ({ sucursales }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedSucursal, setSelectedSucursal] = useState<ISucursal | null>(null);

	const handleOpenModal = (sucursal: ISucursal) => {
		setSelectedSucursal(sucursal);
		setModalOpen(true);
	};

	const handleCloseModal = (sucursal: ISucursal) => {
		setModalOpen(false);
		setSelectedSucursal(null);
	};
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, minmax(250px, 1fr))",
				gap: "1.3rem",
				justifyItems: "stretch",
			}}
		>
			{sucursales.length > 0 ? (
				sucursales.map((sucursal, index) => (
					<SucursalCard
						key={index}
						sucursal={sucursal}
						onViewClick={() => {
							handleOpenModal(sucursal);
						}}
					/>
				))
			) : (
				<h3>Aun no hay sucursales cargadas</h3>
			)}
		</div>
	);
};
