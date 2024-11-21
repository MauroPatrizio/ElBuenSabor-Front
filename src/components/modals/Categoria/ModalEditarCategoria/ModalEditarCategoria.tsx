import React, { FC, useEffect, useState } from 'react'
import { categoriaService } from "../../../../services/categoriaService";
import Swal from "sweetalert2";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria"; 
import { Modal, Form, Button } from "react-bootstrap";
import styles from "./ModalEditarCategoria.module.css";

interface IModalEditarCategoriaProps {
  show: boolean;
  onHide: () => void;
  categoria: IUpdateCategoria | null; 
}

const ModalEditarCategoria: FC<IModalEditarCategoriaProps> = ({
  show,
  onHide,
  categoria,
}) => {
    const [formData, setFormData] = useState<IUpdateCategoria>({
        id: 0,
        denominacion: "",
        eliminado: false, 
        idEmpresa: 0,
        idSucursales: [], 
        idCategoriaPadre: undefined,
      });
      

  useEffect(() => {
    if (categoria) {
      setFormData(categoria); 
    }
  }, [categoria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "idEmpresa" || name === "idCategoriaPadre" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (categoria?.id) {

        await categoriaService.updateCategoria(categoria.id, formData); 
        Swal.fire({
          icon: "success",
          title: "Se actualizó correctamente",
          showCancelButton: false,
          timer: 500,
        });

        onHide();
        window.location.reload();
      } else {
        throw new Error('ID de categoría no disponible');
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la categoría",
      });
      onHide();
    }
  };

  return (
    <div className={styles["div-main"]}>
      <Modal
        show={show}
        onHide={onHide}
        className={styles["modal"]}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="denominacion">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="denominacion"
                value={formData.denominacion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="idEmpresa">
              <Form.Label>ID Empresa</Form.Label>
              <Form.Control
                type="number"
                name="idEmpresa"
                value={formData.idEmpresa}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="idCategoriaPadre">
              <Form.Label>ID Categoría Padre</Form.Label>
              <Form.Control
                type="number"
                name="idCategoriaPadre"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="outline-success" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditarCategoria;
