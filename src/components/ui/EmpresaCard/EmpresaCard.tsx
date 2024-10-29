import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "./EmpresaCard.module.css";

interface FormData {
  nombreEmpresa: string;
  razonSocial: string;
  cuit: number | "";
}

interface CardEmpresaProps {
  dato: FormData;
  handleVerEmpresa: (empresa: FormData) => void;
  handleEditarEmpresa: (empresa: FormData) => void;
}

const CardEmpresa: React.FC<CardEmpresaProps> = ({
  dato,
  handleVerEmpresa,
  handleEditarEmpresa,
}) => {
  return (
    <Card className={style.cardContainer}>
      <Card.Body className={style.cardBody}>
        <Card.Title style={{borderBottom:"1px solid black"}}>{dato.nombreEmpresa}</Card.Title>
        <div className={style.buttonContainer}>
          <Button variant="outline-success" onClick={() => handleVerEmpresa(dato)}>
            <span className="material-symbols-outlined">visibility</span>
          </Button>
          <Button variant="outline-warning" onClick={() => handleEditarEmpresa(dato)}>
            <span className="material-symbols-outlined">edit</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardEmpresa;
