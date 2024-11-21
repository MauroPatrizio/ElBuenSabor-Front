import { FC, useEffect, useState } from "react";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import { Table, Button, Modal } from "react-bootstrap";
import ModalCrearAlergeno from "../../modals/Alergeno/ModalCrearAlergeno/ModalCrearAlergeno";
import ModalEditarAlergeno from "../../modals/Alergeno/ModalEditarAlergeno/ModalEditarAlergeno";

interface IListaAlergenosProps {
	alergenos: IAlergenos[];
}

const AlergenosList: FC<IListaAlergenosProps> = ({ alergenos }) => {
	const [listaAlergenos, setListaAlergenos] = useState<IAlergenos[]>([]);
	const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [selectedAlergenoId, setSelectedAlergenoId] = useState<number | null>(null);

	useEffect(() => {
		setListaAlergenos(alergenos);
	}, [alergenos]);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

	// Handle Edit
	const selectedAlergeno = alergenos.find((alergeno) => alergeno.id === selectedAlergenoId);
	const handleEditClick = (id: number) => {
		setSelectedAlergenoId(id);
		setOpenEditModal(true);
	};

	const handleCloseEditModal = () => {
		setOpenEditModal(false);
		setSelectedAlergenoId(null); // Clear the selected allergen ID when closing the modal
	};

	return (
		<div>
			<h3 className="text-center">ALERGENOS</h3>
			<div className="d-flex justify-content-center mb-3">
				<Button
					variant="primary"
					onClick={handleOpenPopUp}
				>
					<b>Agregar Alergeno</b>
				</Button>
			</div>

			<div>
				{listaAlergenos.length > 0 ? (
					<Table
						striped
						bordered
						hover
					>
						<thead>
							<tr>
								<th style={{ textAlign: "center", width: "5%" }}>#</th>
								<th style={{ textAlign: "center", width: "75%" }}>Nombre</th>
								<th style={{ textAlign: "center", width: "20%" }}>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{listaAlergenos.map((alergeno, index) => (
								<tr key={index}>
									<td style={{ textAlign: "center" }}>{index + 1}</td>
									<td style={{ textAlign: "center" }}>{alergeno.denominacion}</td>
									<td style={{ display: "flex", justifyContent: "space-evenly" }}>
										<Button
											variant="warning"
											onClick={() => handleEditClick(alergeno.id)}
										>
											<span className="material-symbols-outlined">edit</span>
										</Button>
										<Button variant="danger">
											<span className="material-symbols-outlined">
												delete
											</span>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<div>No hay alergenos creados</div>
				)}
			</div>

			{/* Modal Crear */}
			<Modal
				show={mostrarPopUp}
				onHide={handleClosePopUp}
			>
				<Modal.Header closeButton>
					<Modal.Title>Crear Alergeno</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ModalCrearAlergeno
						show={mostrarPopUp}
						onHide={handleClosePopUp}
					/>
				</Modal.Body>
			</Modal>

			{/* Modal Editar */}
			{openEditModal && selectedAlergeno && (
				<ModalEditarAlergeno
					show={openEditModal}
					onHide={handleCloseEditModal}
					alergeno={selectedAlergeno}
				/>
			)}
		</div>
	);
};

export default AlergenosList;
