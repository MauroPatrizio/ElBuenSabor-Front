import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
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
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProductos | null>(null);

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
        await productoService.deleteProduct(id);
        Swal.fire({
          icon: "success",
          title: "Producto eliminado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        // Actualizar la lista local después de eliminar
        setListaProductos((prev) =>
          prev.filter((producto) => producto.id !== id)
        );
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
      <h3 className="text-center">PRODUCTOS</h3>
      <Button
        onClick={handleOpenPopUp}
        variant="primary"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Agregar Producto
      </Button>

      <div>
        {listaProductos.length > 0 ? (
          <div>
            <Table striped bordered hover>
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
                    <td className="text-center">{index + 1}</td>{" "}
                    {/* Número de fila */}
                    <td className="text-center">{producto.denominacion}</td>
                    <td className="text-center">{producto.descripcion}</td>
                    <td className="text-center">{producto.precioVenta}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Button
                        variant="warning"
                        onClick={() => handleOpenPopUpEdicion(producto)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(producto.id)}
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
          <div>No hay productos creados</div>
        )}
      </div>

      {mostrarPopUp && (
        <ModalCrearProducto show={mostrarPopUp} onHide={handleClosePopUp} />
      )}
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
