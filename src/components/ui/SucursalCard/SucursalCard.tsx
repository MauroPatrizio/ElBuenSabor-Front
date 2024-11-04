import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import styles from "./SucursalCard.module.css";
import { ModalVerSucursal } from "../../modals/Sucursal/ModalVerSucursal/ModalVerSucursal";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { ModalEditSucursal } from "../../modals/Sucursal/ModalEditSucursal/ModalEditSucursal";

interface SucursalCardProps {
  sucursal: ISucursal;
}

const SucursalCard: FC<SucursalCardProps> = ({ sucursal }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const handleViewOpen = () => setViewOpen(true);
  const handleViewClose = () => setViewOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  // Función para manejar la redirección al hacer clic en el botón de administración
  const handleAdminRedirect = () => {
    navigate("/admin"); // Ajusta la ruta si necesitas parámetros adicionales
  };

  return (
    <div className={styles["div-card"]}>
      <Card className={styles["card-main"]}>
        <Card.Body className={styles["card-body"]}>
          <Card.Title>{sucursal.nombre}</Card.Title>
          <Card.Text>
            Apertura: {sucursal.horarioApertura} - {sucursal.horarioCierre} <br />
          </Card.Text>
          <Card.Img
            style={{ maxHeight: "15rem", maxWidth: "14.9rem" }}
            variant="top"
            src={sucursal.logo || ""}
          />
          <div className={styles["buttons"]}>
            {/* botón de administración */}
            <Button
              variant="outline-primary"
              onClick={handleAdminRedirect} // Llama a la función al hacer clic
            >
              <span className="material-symbols-outlined">apartment</span>
            </Button>
            {/* botón editar */}
            <Button variant="outline-warning" onClick={handleEditOpen}>
              <span className="material-symbols-outlined">edit</span>
            </Button>
            {/* Botón ver */}
            <Button variant="outline-success" onClick={handleViewOpen}>
              <span className="material-symbols-outlined">visibility</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
      {/* Modal Edit */}
      <ModalEditSucursal show={editOpen} onHide={handleEditClose} sucursal={sucursal} />

      {/* Modal View */}
      <ModalVerSucursal sucursal={sucursal} show={viewOpen} onHide={handleViewClose} />
    </div>
  );
};

export default SucursalCard;