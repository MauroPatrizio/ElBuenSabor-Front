import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { categoriaService } from '../../../../services/categoriaService';

interface IModalEliminarCategoriaProps {
  show: boolean;
  onHide: () => void;
  categoriaId: number | null;
}

const ModalEliminarCategoria: FC<IModalEliminarCategoriaProps> = ({ show, onHide, categoriaId }) => {
  const handleDelete = async () => {
    if (!categoriaId) return;

    try {
      await categoriaService.deleteCategoria(categoriaId); 
      Swal.fire({
        icon: 'success',
        title: 'Categoría eliminada correctamente',
        showCancelButton: false,
        timer: 500,
      });
      onHide();
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la categoría',
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="outline-danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminarCategoria;
