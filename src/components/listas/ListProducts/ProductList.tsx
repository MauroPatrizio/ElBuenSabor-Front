import  { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import ModalCrearProducto from "../../modals/Producto/ModalCrearProducto/ModalCrearProducto";


interface IListaProductsProps {
	productos: IProductos[];
}

const ProductList: FC<IListaProductsProps> = ({productos}) => {

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
        <h3>PRODUCTOS</h3>
        <button onClick={handleOpenPopUp}>Agregar Producto</button>
      <div>
    
      {listaProductos.length > 0 ? (
    <div>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Habilitado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaProductos.map((producto, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td> {/* Número de fila */}
                        <td>{producto.precioVenta}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.habilitado ? "Sí" : "No"}</td>
                        <td>
                            <button>editar</button>
                            <button>eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
) : (
    <div>No hay productos creados</div>
)}
       
      </div>
      {mostrarPopUp && (
        <>
            <ModalCrearProducto
                show={mostrarPopUp}
                onHide={handleClosePopUp}
            />
        </>
    )}
    </div>
  );
};

export default ProductList;
