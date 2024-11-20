import { FC, useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import ModalCrearProducto from "../../modals/Producto/ModalCrearProducto/ModalCrearProducto";

interface IListaProductsProps {
	productos: IProductos[];
}

const ProductList: FC<IListaProductsProps> = ({ productos }) => {
	const [listaProductos, setListaProductos] = useState<IProductos[]>([]);

	useEffect(() => {
		setListaProductos(productos);
	}, [productos]);

	const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

	return (
		<div>
			<h3 className="text-center">PRODUCTOS</h3>
			<Button
				variant="primary"
				onClick={handleOpenPopUp}
				style={{ display: "flex", justifyContent: "center" }}
			>
				Agregar Producto
			</Button>

			<div>
				{listaProductos.length > 0 ? (
					<Table
						striped
						bordered
						hover
					>
						<thead>
							<tr>
								<th className="text-center">#</th>
								<th className="text-center">Precio</th>
								<th className="text-center">Descripción</th>
								<th className="text-center">Habilitado</th>
								<th className="text-center">Acciones</th>
							</tr>
						</thead>
						<tbody>
							{listaProductos.map((producto, index) => (
								<tr key={index}>
									<td className="text-center">{index + 1}</td>{" "}
									{/* Número de fila */}
									<td className="text-center">{producto.precioVenta}</td>
									<td className="text-center">{producto.descripcion}</td>
									<td className="text-center">
										{producto.habilitado ? "Sí" : "No"}
									</td>
									<td style={{ display: "flex", justifyContent: "space-evenly" }}>
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
					<div>No hay productos creados</div>
				)}
			</div>

			<Modal
				show={mostrarPopUp}
				onHide={handleClosePopUp}
			>
				<Modal.Header closeButton>
					<Modal.Title>Crear Producto</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ModalCrearProducto
						show={mostrarPopUp}
						onHide={handleClosePopUp}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default ProductList;
