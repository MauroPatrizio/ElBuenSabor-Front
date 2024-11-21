import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { alergenoService } from "../../../../services/alergenoService";

interface IModalEliminarAlergenoProps {
	show: boolean;
	onHide: () => void;
	alergenoId: number | null;
}

const ModalEliminarAlergeno: FC<IModalEliminarAlergenoProps> = ({ show, onHide, alergenoId }) => {
	const handleDelete = async () => {
		if (!alergenoId) return;

		try {
			await alergenoService.deleteAlergeno(alergenoId);
			Swal.fire({
				icon: "success",
				title: "Alérgeno eliminado correctamente",
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
				text: "No se pudo eliminar el alérgeno",
			});
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			backdrop="static"
		>
			<Modal.Header closeButton>
				<Modal.Title>Eliminar Alérgeno</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				¿Estás seguro de que deseas eliminar este alérgeno? Esta acción no se puede
				deshacer.
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="outline-warning"
					onClick={onHide}
				>
					Cancelar
				</Button>
				<Button
					variant="outline-danger"
					onClick={handleDelete}
				>
					Eliminar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEliminarAlergeno;
