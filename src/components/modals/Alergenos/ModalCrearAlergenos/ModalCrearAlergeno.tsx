import React, { FC, useState } from "react";
import style from "./ModalCrearAlergeno.module.css";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { Button, Form, Modal } from "react-bootstrap";
import { alergenoService } from "../../../../services/alergenoService";
import Swal from "sweetalert2";

interface IModalCrearAlergenoProps {
  show: boolean;
  onHide: () => void;
}

const ModalCrearAlergeno: FC<IModalCrearAlergenoProps> = ({ show, onHide }) => {
  const [formData, setFormData] = useState<Partial<IAlergenos>>({
    denominacion: "",
    imagen: { url: ""},
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await alergenoService.createAlergeno(formData as IAlergenos);
      Swal.fire({
        icon: "success",
        title: "Alérgeno añadido correctamente",
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
        text: "No se pudo agregar el alérgeno",
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
          <Modal.Title>Agregar Alérgeno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="denominacion">
              <Form.Label>Nombre del Alérgeno</Form.Label>
              <Form.Control
                type="text"
                name="denominacion"
                value={formData.denominacion || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="imagen">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
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

export default ModalCrearAlergeno;
