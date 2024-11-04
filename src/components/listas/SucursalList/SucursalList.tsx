import { useEffect, useState } from "react";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import SucursalCard from "../../ui/SucursalCard/SucursalCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import styles from "./SucursalList.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

export const SucursalList = () => {
	const BASE_URL = "http://190.221.207.224:8090/sucursales/";

	const selectedEmpresa = useSelector((state: RootState) => state.empresa.selectedEmpresa);

	const idEmpresa = selectedEmpresa?.id;

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);

	const [isEmpresaSelected, setIsEmpresaSelected] = useState<boolean>(true);

	useEffect(() => {
		if (idEmpresa) {
			fetch(`${BASE_URL}/porEmpresa/${idEmpresa}`)
				.then((response) => {
					if (response) {
						return response.json();
					} else {
						console.error("No se pudieron cargar las sucursales");
					}
				})
				.then((data: ISucursal[]) => {
					setSucursales(data);
				});
		}
	}, [idEmpresa]);

	return (
		<div>
			<div className={styles["div-lista"]}></div>
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
	);
};
