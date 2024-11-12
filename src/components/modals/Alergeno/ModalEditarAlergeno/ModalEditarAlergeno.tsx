import { ChangeEvent, FC, useState } from "react";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./ModalEditarAlergeno.module.css"
import { IUpdateAlergeno } from "../../../../types/dtos/alergenos/IUpdateAlergeno";
import { BASE_URL_ALERGENOS } from "../../../../services/alergenoService";
import Swal from "sweetalert2";
interface IModalEditarAlergenoProps {
	show: boolean;
	onHide: () => void;
	alergeno: IAlergenos;
}


const ModalEditarAlergeno: FC<IModalEditarAlergenoProps> = ({show, onHide, alergeno }) => {
  console.log(alergeno.id)
  const [formData, setFormData] = useState<IUpdateAlergeno>({
		denominacion: alergeno.denominacion,
    imagen: alergeno.imagen,
    id: alergeno.id
	});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "imagen" ? { url: value } : value
    }));
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const enviar = JSON.stringify(formData);
    try {
      const response = await fetch(`${BASE_URL_ALERGENOS}/${alergeno.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: enviar
      });

      if (response.ok) {
        
        Swal.fire({
          icon: "success",
          title: "Se actualizó correctamente",
          showConfirmButton: false,
          timer: 2000
        });
        onHide();
        window.location.reload();
      } else {
        console.error("No se pudo actualizar");
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className={styles["div-main"]}>
      <Modal show={show} onHide={onHide} className={styles["modal"]} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editar Alergeno</Modal.Title>
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
            <Form.Group controlId="imagen" className={styles.imageUpload}>
              <Form.Label className={styles.imageLabel}>Elige una imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleChange} />
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
  )
}

export default ModalEditarAlergeno
