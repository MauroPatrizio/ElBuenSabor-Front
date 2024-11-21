import { FC, useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import ModalCrearCategoria from "../../modals/Categoria/ModalCrearCategoria/ModalCrearCategoria";
import ModalEliminarCategoria from "../../modals/Categoria/ModalEliminarCategoria/ModalEliminarCategoria";
import ModalEditarCategoria from "../../modals/Categoria/ModalEditarCategoria/ModalEditarCategoria";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";

interface IListaCategoriasProps {
  categorias: ICategorias[];
}

const CategorieList: FC<IListaCategoriasProps> = ({ categorias }) => {
  const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false); // Para el modal de creación
  const [openEditModal, setOpenEditModal] = useState<boolean>(false); // Para el modal de edición
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false); // Para el modal de eliminar
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(null); // ID de la categoría seleccionada para eliminar/editar
  const [categoriaToEdit, setCategoriaToEdit] = useState<IUpdateCategoria | null>(null); // Datos de la categoría para editar

  useEffect(() => {
    setListaCategorias(categorias);
  }, [categorias]);

  // Manejo del modal de creación
  const handleOpenPopUp = () => {
    setMostrarPopUp(true);
  };

  const handleClosePopUp = () => {
    setMostrarPopUp(false);
  };

  // Manejo del modal de eliminación
  const handleDeleteClick = (id: number) => {
    setSelectedCategoriaId(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedCategoriaId(null);
  };

  // Manejo del modal de edición
  const handleEditClick = (categoria: ICategorias) => {
    // Convertir la categoría seleccionada a IUpdateCategoria
    const categoriaToUpdate: IUpdateCategoria = {
      id: categoria.id,
      denominacion: categoria.denominacion,
      eliminado: categoria.eliminado,
      idEmpresa: categoria.idEmpresa,
      idSucursales: categoria.sucursales.map((s) => s.id), // Suponiendo que sucursales es un array de objetos
      idCategoriaPadre: categoria.idCategoriaPadre || undefined,
    };

    setCategoriaToEdit(categoriaToUpdate);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCategoriaToEdit(null);
  };

  return (
    <div>
      <h3 className="text-center">CATEGORÍAS</h3>
      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={handleOpenPopUp}>
          <b>Agregar Categoría</b>
        </Button>
      </div>

      <div>
        {listaCategorias.length > 0 ? (
          <Table striped bordered hover>
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
                <tr key={index} style={{ display: "flex", width: "100vw" }}>
                  <td style={{ textAlign: "center", width: "5%" }}>{index + 1}</td>
                  <td style={{ textAlign: "center", width: "74%" }}>{categoria.denominacion}</td>
                  <td style={{ textAlign: "center", width: "10%" }}>
                    {categoria.eliminado ? "Sí" : "No"}
                  </td>
                  <td style={{ display: "flex", justifyContent: "space-evenly", width: "10%" }}>
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(categoria)} // Pasa la categoría completa
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(categoria.id)} // Abre el modal con el ID de la categoría seleccionada
                    >
                      <span className="material-symbols-outlined">delete</span>
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

      {/* Modal Crear */}
      <Modal show={mostrarPopUp} onHide={handleClosePopUp}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalCrearCategoria show={mostrarPopUp} onHide={handleClosePopUp} />
        </Modal.Body>
      </Modal>

      {/* Modal Eliminar */}
      {openDeleteModal && selectedCategoriaId !== null && (
        <ModalEliminarCategoria
          show={openDeleteModal}
          onHide={handleCloseDeleteModal}
          categoriaId={selectedCategoriaId}
        />
      )}

      {/* Modal Editar */}
      {openEditModal && categoriaToEdit && (
        <ModalEditarCategoria
          show={openEditModal}
          onHide={handleCloseEditModal}
          categoria={categoriaToEdit}
        />
      )}
    </div>
  );
};

export default CategorieList;
