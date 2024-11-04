import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { empresaService } from "../../../services/empresaService";
import style from "./ViewEmpresas.module.css";
import { ModalCrearEmpresa } from "../../modals/Empresa/ModalCrearEmpresa/ModalCrearEmpresa";
import { ListaEmpresas } from "../../listas/ListaEmpresas/ListaEmpresas";

export const ViewEmpresas = () => {
	const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
	const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

	useEffect(() => {
		const fetch = async () => {
			const datos = await empresaService.getAllEmpresas();
			setEmpresas(datos);
		};
		fetch();
	}, []);

	return (
		<div className={mostrarPopUp ? style["div-main"] : ""}>
			<div className={style.containerEmpresaSucursal}>
				<div className={style.containerEmpresa}>
					<h3>Empresa</h3>
					<button onClick={handleOpenPopUp}>Agregar empresa</button>
					<div className={style["div-lista-empresas"]}>
						<ListaEmpresas empresas={empresas}></ListaEmpresas>
					</div>
				</div>
			</div>
			{mostrarPopUp && (
				<>
					<ModalCrearEmpresa
						show={mostrarPopUp}
						onHide={handleClosePopUp}
					/>
				</>
			)}
		</div>
	);
};
