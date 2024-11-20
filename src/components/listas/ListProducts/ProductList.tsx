import { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { ModalCrearProducto } from "../../modals/Producto/ModalCrearProducto/ModalCrearProducto";
import ModalEditarProducto from "../../modals/Producto/ModalEditarProducto/ModalEditarProducto";
import { productoService } from "../../../services/productoService";
import Swal from "sweetalert2";

interface IListaProductsProps {
    productos: IProductos[];
}

const ProductList: FC<IListaProductsProps> = ({ productos }) => {
    const [listaProductos, setListaProductos] = useState<IProductos[]>([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState<IProductos | null>(null);

    useEffect(() => {
        setListaProductos(productos);
    }, [productos]);

    const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
    const [modoEdicion, setModoEdicion] = useState<boolean>(false);

    const handleOpenPopUp = () => {
        setMostrarPopUp(true);
    };

    const handleOpenPopUpEdicion = (productoSelec: IProductos) => {
        setProductoSeleccionado(productoSelec);
        setModoEdicion(true);
    };

    const handleClosePopUp = () => {
        setMostrarPopUp(false);
        setModoEdicion(false);
        setProductoSeleccionado(null);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
    
    
        if (result.isConfirmed) {
            try {
                await productoService.deleteProduct(id);
                Swal.fire({
                    icon: "success",
                    title: "Producto eliminado con éxito",
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Actualizar la lista local después de eliminar
                setListaProductos((prev) => prev.filter((producto) => producto.id !== id));
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
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
            <h3>PRODUCTOS</h3>
            <button onClick={handleOpenPopUp}>Agregar Producto</button>

            <div>
                {listaProductos.length > 0 ? (
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Denominación</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProductos.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{index + 1}</td> {/* Número de fila */}
                                        <td>{producto.denominacion}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>{producto.precioVenta}</td>
                                        <td>
                                            <button onClick={() => handleOpenPopUpEdicion(producto)}>
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(producto.id)}>
                                                Eliminar
                                            </button>
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

            {mostrarPopUp && <ModalCrearProducto show={mostrarPopUp} onHide={handleClosePopUp} />}
            {modoEdicion && productoSeleccionado && (
                <ModalEditarProducto
                    show={modoEdicion}
                    onHide={handleClosePopUp}
                    producto={productoSeleccionado}
                />
            )}
        </div>
    );
};

export default ProductList;
