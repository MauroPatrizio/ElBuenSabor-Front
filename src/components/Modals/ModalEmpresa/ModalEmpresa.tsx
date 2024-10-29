import React from "react";
import { Button, Form } from "react-bootstrap";
import style from "./ModalEmpresa.module.css"
interface FormData {
  nombreEmpresa: string;
  razonSocial: string;
  cuit: number | "";
}

interface ModalEmpresaProps {
  mostrarPopUp: boolean;
  formData: FormData;
  modoEdicion: boolean;
  empresaSeleccionada: FormData | null;
  manejarCambio: (e: React.ChangeEvent<HTMLInputElement>) => void;
  manejarSubmit: (e: React.FormEvent) => void;
  handleClosePopUp: () => void;
}

const ModalEmpresa: React.FC<ModalEmpresaProps> = ({
  mostrarPopUp,
  formData,
  modoEdicion,
  empresaSeleccionada,
  manejarCambio,
  manejarSubmit,
  handleClosePopUp,
}) => {
  if (!mostrarPopUp) return null;

  return (
    <div className={style.popUp__crearEmpresa}>
      <div className={style.crearEmpresa}>
        <h2>
          {empresaSeleccionada
            ? modoEdicion
              ? "Editar Empresa"
              : "Ver Empresa"
            : "Crear Empresa"}
        </h2>
        {modoEdicion ? (
          <Form onSubmit={manejarSubmit}>
            <Form.Group className="mb-3" controlId="nombreEmpresa">
              <Form.Control
                type="text"
                placeholder="Nombre de la Empresa"
                name="nombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={manejarCambio}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="razonSocial">
              <Form.Control
                type="text"
                placeholder="Razon Social"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={manejarCambio}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cuit">
              <Form.Control
                type="text"
                placeholder="CUIT"
                name="cuit"
                value={formData.cuit}
                onChange={manejarCambio}
              />
            </Form.Group>
            <Button onClick={handleClosePopUp} variant="outline-danger">
              CERRAR
            </Button>
            <Button type="submit" variant="outline-success">
              CONFIRMAR
            </Button>
          </Form>
        ) : (
          <div>
            <p>
              <strong>Nombre de la Empresa:</strong>{" "}
              {empresaSeleccionada?.nombreEmpresa}
            </p>
            <p>
              <strong>Razón Social:</strong> {empresaSeleccionada?.razonSocial}
            </p>
            <p>
              <strong>CUIT:</strong> {empresaSeleccionada?.cuit}
            </p>
            <Button onClick={handleClosePopUp} variant="outline-danger">
              CERRAR
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalEmpresa;