import { FC, useEffect, useState } from "react";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import EmpresaCard from "../../ui/EmpresaCard/EmpresaCard";
import styles from "./ListaEmpresas.module.css";

interface IListaEmpresasProps {
	empresas: IEmpresa[];
}

export const ListaEmpresas: FC<IListaEmpresasProps> = ({ empresas }) => {
	const [listaEmpresas, setListaEmpresas] = useState<IEmpresa[]>([]);

	useEffect(() => {
		setListaEmpresas(empresas);
	}, [empresas]);

	return (
		<div className={styles["div-lista"]}>
			{listaEmpresas.length > 0 ? (
				<div>
					{listaEmpresas.map((empresa) => (
						<EmpresaCard
							key={empresa.id}
							dato={empresa}
						/>
					))}
				</div>
			) : (
				<div>No hay empresas creadas</div>
			)}
		</div>
	);
};
