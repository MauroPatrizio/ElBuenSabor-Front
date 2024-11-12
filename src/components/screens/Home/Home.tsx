import { ViewSucursales } from "../../Views/ViewSucursales/ViewSucursales";
import { ViewEmpresas } from "../../Views/ViewEmpresas/ViewEmpresas";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

export const Home = () => {
	const applyStyle = useSelector((state: RootState) => state.estilo.applyStyle);

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<div className={styles["div-empresas"]}>
				<ViewEmpresas />
			</div>
			<div className={styles["div-sucursales"]}>
				<ViewSucursales />
			</div>
		</div>
	);
};
