import { ViewSucursales } from "../../Views/ViewSucursales/ViewSucursales";
import { ViewEmpresas } from "../../Views/ViewEmpresas/ViewEmpresas";
import styles from "./Home.module.css";

export const Home = () => {
	return (
		<div>
			<div className={styles["div-main"]}>
				<div className={styles["div-empresas"]}>
					<ViewEmpresas />
				</div>
				<div className={styles["div-sucursales"]}>
					<ViewSucursales />
				</div>
			</div>
		</div>
	);
};
