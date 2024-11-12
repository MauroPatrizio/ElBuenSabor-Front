import { FC, useState } from "react";
import { categoriaService } from "../../../../services/categoriaService";
import Swal from "sweetalert2";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { Modal, Form, Button } from "react-bootstrap";
import styles from "./ModalCrearCategoria.module.css"


interface IModalCrearCategoriaProps {
	show: boolean;
	onHide: () => void;
}


const ModalCrearCategoria: FC<IModalCrearCategoriaProps> = ({ show, onHide }) => {


    const [formData, setFormData] = useState<ICreateCategoria>({
		denominacion: "",
        idEmpresa: 0,
        idCategoriaPadre: 0,
	});

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
            await categoriaService.createCategoria(formData);
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
    <div className={styles["div-main"]}>
			<Modal
				show={show}
				onHide={onHide}
				className={styles["modal"]}
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Agregar Categoria</Modal.Title>
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
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="outline-warning"
						onClick={onHide}
					>
						Cancelar
					</Button>
					<Button
						variant="outline-success"
						onClick={handleSubmit}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
  )
}

export default ModalCrearCategoria
