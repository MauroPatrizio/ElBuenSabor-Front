import { FC, useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import ModalCrearCategoria from "../../modals/Categoria/ModalCrearCategoria/ModalCrearCategoria";

interface IListaCategoriasProps {
	categorias: ICategorias[];
}

const CategorieList: FC<IListaCategoriasProps> = ({ categorias }) => {
	const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);

	useEffect(() => {
		setListaCategorias(categorias);
	}, [categorias]);

	const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

	return (
		<div>
			<h3 className="text-center">CATEGORÍAS</h3>
			<div className="d-flex justify-content-center mb-3">
				<Button
					variant="primary"
					onClick={handleOpenPopUp}
				>
					<b>Agregar Categoría</b>
				</Button>
			</div>

			<div>
				{listaCategorias.length > 0 ? (
					<Table
						striped
						bordered
						hover
					>
						<thead>
							<tr style={{ display: "flex", width: "100vw" }}>
								<th style={{ textAlign: "center", width: "5%" }}>#</th>
								<th style={{ textAlign: "center", width: "74%" }}>Denominación</th>
								<th style={{ textAlign: "center", width: "10%" }}>Eliminado</th>
								<th style={{ textAlign: "center", width: "10%" }}>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{listaCategorias.map((categoria, index) => (
								<tr
									key={index}
									style={{ display: "flex", width: "100vw" }}
								>
									<td style={{ textAlign: "center", width: "5%" }}>
										{index + 1}
									</td>
									<td style={{ textAlign: "center", width: "74%" }}>
										{categoria.denominacion}
									</td>
									<td style={{ textAlign: "center", width: "10%" }}>
										{categoria.eliminado ? "Sí" : "No"}
									</td>
									<td
										style={{
											display: "flex",
											justifyContent: "space-evenly",
											width: "10%",
										}}
									>
										<Button variant="warning">
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
					<div>No hay categorías creadas</div>
				)}
			</div>

			<Modal
				show={mostrarPopUp}
				onHide={handleClosePopUp}
			>
				<Modal.Header closeButton>
					<Modal.Title>Crear Categoría</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ModalCrearCategoria
						show={mostrarPopUp}
						onHide={handleClosePopUp}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CategorieList;
