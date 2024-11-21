import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { alergenoService } from "../../../services/alergenoService";
import ModalCrearAlergeno from "../../modals/Alergeno/ModalCrearAlergeno/ModalCrearAlergeno";
import ModalEditarAlergeno from "../../modals/Alergeno/ModalEditarAlergeno/ModalEditarAlergeno";

interface IListaAlergenosProps {
	alergenos: IAlergenos[];
}

const alergenosList: FC<IListaAlergenosProps> = ({ alergenos }) => {
	const [listaAlergenos, setListaAlergenos] = useState<IAlergenos[]>([]);
	const [alergenoSeleccionado, setAlergenoSeleccionado] = useState<IAlergenos | null>(null);

	useEffect(() => {
		setListaAlergenos(alergenos);
	}, [alergenos]);

	const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
	const [modoEdicion, setModoEdicion] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleOpenPopUpEdicion = (alergenoSelec: IAlergenos) => {
		setAlergenoSeleccionado(alergenoSelec);
		setModoEdicion(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
		setModoEdicion(false);
		// setAlergenoSeleccionado(null);
	};

	const handleDelete = async (id: number) => {
		const result = await Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción no se puede deshacer.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		});

		if (result.isConfirmed) {
			try {
				console.log("El ID que se intenta eliminar es:", id);

				await alergenoService.deleteAlergeno(id);
				Swal.fire({
					icon: "success",
					title: "Alergeno eliminado con éxito",
					showConfirmButton: false,
					timer: 1500,
				});
				// Actualizar la lista local después de eliminar
				setListaAlergenos((prev) => prev.filter((alergeno) => alergeno.id !== id));
			} catch (error) {
				console.error("Error al eliminar el alergeno:", error);
				Swal.fire({
					icon: "error",
					title: "Error al eliminar",
					text: "Intente nuevamente más tarde.",
				});
			}
		}
	};

	return (
		<div>
			<h3 className="text-center">ALERGENOS</h3>
			<div style={{ display: "flex", justifyContent: "center", margin: "1.5rem" }}>
				<Button
					variant="primary"
					onClick={handleOpenPopUp}
				>
					Agregar Alergeno
				</Button>
			</div>

			<div>
				{listaAlergenos.length > 0 ? (
					<div>
						<Table
							striped
							bordered
							hover
						>
							<thead>
								<tr style={{ display: "flex", width: "100vw" }}>
									<th style={{ textAlign: "center", width: "10%" }}>#</th>
									<th style={{ textAlign: "center", width: "70%" }}>Nombre</th>
									<th style={{ textAlign: "center", width: "20%" }}>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{listaAlergenos.map((alergeno, index) => (
									<tr
										key={alergeno.id}
										style={{ display: "flex", width: "100vw" }}
									>
										<td style={{ textAlign: "center", width: "10%" }}>
											{index + 1}
										</td>{" "}
										{/* Número de fila */}
										<td style={{ textAlign: "center", width: "70%" }}>
											{alergeno.denominacion}
										</td>
										<td
											style={{
												display: "flex",
												justifyContent: "space-evenly",
												textAlign: "center",
												width: "20%",
											}}
										>
											<Button
												variant="warning"
												onClick={() => handleOpenPopUpEdicion(alergeno)}
											>
												<span className="material-symbols-outlined">
													edit
												</span>
											</Button>
											<Button
												variant="danger"
												onClick={() => handleDelete(alergeno.id)}
											>
												<span className="material-symbols-outlined">
													delete
												</span>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				) : (
					<div>No hay alergenos creados</div>
				)}
			</div>

			{mostrarPopUp && (
				<ModalCrearAlergeno
					show={mostrarPopUp}
					onHide={handleClosePopUp}
				/>
			)}
			{modoEdicion && alergenoSeleccionado && (
				<ModalEditarAlergeno
					show={modoEdicion}
					onHide={handleClosePopUp}
					alergeno={alergenoSeleccionado}
				/>
			)}
		</div>
	);
};

export default alergenosList;
