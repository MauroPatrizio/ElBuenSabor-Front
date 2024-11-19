import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import styles from './ModalEditarAlergeno.module.css';
import { IUpdateAlergeno } from '../../../../types/dtos/alergenos/IUpdateAlergeno'; 
import { alergenoService } from '../../../../services/alergenoService';

interface IModalEditarAlergenoProps {
  show: boolean;
  onHide: () => void;
  alergeno: IUpdateAlergeno | null; 
}

const ModalEditarAlergeno: FC<IModalEditarAlergenoProps> = ({ show, onHide, alergeno }) => {
  const [formData, setFormData] = useState<IUpdateAlergeno>({
    id: 0,                
    denominacion: '',
    imagen: {
      name: '',
      url: '',
    },
  });

  useEffect(() => {
    if (alergeno) {
      setFormData(alergeno); 
    }
  }, [alergeno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'imagen' && files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        imagen: {
          name: file.name,
          url: imageUrl,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (alergeno?.id) {
        // Actualizar el alérgeno usando el ID
        await alergenoService.updateAlergeno(alergeno.id, formData); 
        Swal.fire({
          icon: 'success',
          title: 'Alérgeno actualizado correctamente',
          showCancelButton: false,
          timer: 500,
        });

        onHide();
        window.location.reload();
      } else {
        throw new Error('ID de alérgeno no disponible');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el alérgeno',
      });
      onHide();
    }
  };

  return (
    <div className={styles['div-main']}>
      <Modal show={show} onHide={onHide} className={styles['modal']} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Editar Alérgeno</Modal.Title>
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
              <Form.Label className={styles.imageLabel}>Cambiar Imagen</Form.Label>
              <Form.Control type="file" name="imagen" onChange={handleChange} />
              {formData.imagen.url && (
                <img
                  src={formData.imagen.url}
                  alt="Vista previa"
                  className={styles.imagePreview}
                />
              )}
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

export default ModalEditarAlergeno;
