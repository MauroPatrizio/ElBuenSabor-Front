import { useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { EmpresaService } from "../../../services/empresaService";
import style from "./ViewEmpresas.module.css";
import { ModalCrearEditarEmpresa } from "../../modals/Empresa/ModalCrearEmpresa/ModalCrearEditarEmpresa";
import { ListaEmpresas } from "../../listas/ListaEmpresas/ListaEmpresas";
import { Button } from "react-bootstrap";

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
			const datos = await EmpresaService.getAllEmpresas();
			setEmpresas(datos);
		};
		fetch();
	}, []);

	return (
		<div>
			<div className={style.containerEmpresa}>
				<h3 style={{ color: "#2F4156" }}>
					<b>EMPRESAS</b>
				</h3>
				<Button
					variant="primary"
					onClick={handleOpenPopUp}
					style={{ backgroundColor: "#567C8D", borderColor: "#567C8D" }}
				>
					Agregar empresa
				</Button>
				<div className={style["div-lista-empresas"]}>
					<ListaEmpresas empresas={empresas}></ListaEmpresas>
				</div>
			</div>
			{mostrarPopUp && (
				<>
					<ModalCrearEditarEmpresa
						show={mostrarPopUp}
						onHide={handleClosePopUp}
					/>
				</>
			)}
		</div>
	);
};
