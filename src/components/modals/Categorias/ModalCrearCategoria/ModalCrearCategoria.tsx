import React, { FC, useState } from "react";
import style from "./ModalCrearCategoria.module.css";
import { Button, Form, Modal } from "react-bootstrap";
import { categoriaService } from "../../../../services/categoriaService";
import Swal from "sweetalert2";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";

interface IModalCrearCategoriaProps {
  show: boolean;
  onHide: () => void;
}

const ModalCrearCategoria: FC<IModalCrearCategoriaProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<Partial<ICategorias>>({
    denominacion: "",
    eliminado: false,
    sucursales: [],
    subCategorias: [],
    categoriaPadre: null,
    articulos: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await categoriaService.createCategoria(formData as ICategorias);
      Swal.fire({
        icon: "success",
        title: "Categoría añadida correctamente",
        showCancelButton: false,
        timer: 500,
      });
      onHide();
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar la categoría",
      });
      onHide();
    }
  };

  return (
    <div className={style["div-main"]}>
      <Modal
        show={show}
        onHide={onHide}
        className={style["modal"]}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="denominacion">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control
                type="text"
                name="denominacion"
                value={formData.denominacion || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="eliminado">
              <Form.Check
                type="checkbox"
                label="Eliminado"
                name="eliminado"
                checked={formData.eliminado || false}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="categoriaPadre">
              <Form.Label>Categoría Padre</Form.Label>
              <Form.Control
                type="text"
                name="categoriaPadre"
                value={formData.categoriaPadre?.denominacion || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="outline-warning" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="outline-success" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalCrearCategoria;
