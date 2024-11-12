import React, { FC, useState } from "react";
import style from "./ModalCrearProducto.module.css";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import { Button, Form, Modal } from "react-bootstrap";
import { productoService } from "../../../../services/productoService";
import Swal from "sweetalert2";

interface IModalCrearProductoProps {
  show: boolean;
  onHide: () => void;
}

const ModalCrearProducto: FC<IModalCrearProductoProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<ICreateProducto>({
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: false,
    codigo: "",
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precioVenta" ? parseFloat(value) : value,
    }));
  };
 

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
        await productoService.createProduct(formData);
        Swal.fire({
            icon: "success",
            title: "Se añadio correctamente",
            showCancelButton: false,
            timer: 500,
        });

        onHide();
        window.location.reload();
    } catch (e) {
      console.error(e);
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto",
      });
      onHide()
      
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
          <Modal.Title>Agregar Producto</Modal.Title>
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

            <Form.Group controlId="precioVenta">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precioVenta"
                value={formData.precioVenta}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="descripcion">
              <Form.Label>descripcion</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="idCategoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="number"
                name="idCategoria"
                value={formData.idCategoria || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="habilitado">
              <Form.Check
                type="checkbox"
                label="habilitado"
                name="habilitado"
                checked={formData.habilitado}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="codigo">
              <Form.Check
                type="checkbox"
                label=""
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="imagenes">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control
                    type="file"
                    name="imagenes"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="outline-warning" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="outline-success" type="submit" onClick={handleSubmit}>
            Guardar
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalCrearProducto;
