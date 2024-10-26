import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import style from "./AdminEmpresasSucursal.module.css";

interface FormData {
  nombreEmpresa: string
  razonSocial: string
  cuit: number | ""
}

const AdminEmpresasSucursal = () => {
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nombreEmpresa: "",
    razonSocial: "",
    cuit: "",
  });
    const [datosGuardados, setDatosGuardados] = useState<FormData[]>([]);

  const handleOpenPopUp = () => {
    setMostrarPopUp(true);

  };

  const handleClosePopUp = () => {
    setMostrarPopUp(false);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "cuit" ? Number(value) || "" : value, 
    });
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos cargados:", formData);
    const nuevoObjeto:FormData = formData
    setDatosGuardados([...datosGuardados,nuevoObjeto]);
    handleClosePopUp();
    setFormData({ nombreEmpresa: "", razonSocial: "", cuit: "" });
  };

  return (
    <div>
      <div className={style.containerEmpresaSucursal}>
        <div className={style.containerEmpresa}>
          <h3>Empresa</h3>
          <button onClick={handleOpenPopUp}>Agregar empresa</button>
          <div className={style.listEmpresas}>
            {datosGuardados.length >0 ?(
              <>
                {datosGuardados.map((dato)=>(
                   <Card style={{ width: "18rem" }}>
                   <Card.Body>
                     <Card.Title>{dato.nombreEmpresa}</Card.Title>
                     <Button variant="primary">Ver Empresa</Button>
                     <Button variant="primary" onClick={handleOpenPopUp}>Editar</Button>
                   </Card.Body>
                 </Card>
                ))} 

            </>
            ):(
              <div>
                <h2>No hay empresas creadas</h2>
              </div>
            )}
          </div>
        </div>
        <div className={style.containerSucursal}>
          <h3>Sucursales</h3>
        </div>
      </div>



      {/* POP UP CREAR EMPRESA */}
      {mostrarPopUp && (
        <div className={style.popUp__crearEmpresa}>
          <div className={style.crearEmpresa}>
            <h2>Crear Empresa</h2>
            <div className={style.form__crearEmpresa}>
            <Form onSubmit={manejarSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control  
                    type="text"
                    placeholder="Nombre de la Empresa"
                    name="nombreEmpresa" // Agregar nombre para la conexión
                    value={formData.nombreEmpresa} // Vincular con el estado
                    onChange={manejarCambio}
                    required />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control 
                 type="text"
                 placeholder="Razon Social"
                 name="razonSocial" // Agregar nombre para la conexión
                 value={formData.razonSocial} // Vincular con el estado
                 onChange={manejarCambio}
                 />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control 
                 type="text"
                 placeholder="CUIT"
                 name="cuit" // Agregar nombre para la conexión
                 value={formData.cuit} // Vincular con el estado
                 onChange={manejarCambio}
                />
              </Form.Group>

              <Button  onClick={handleClosePopUp} variant="outline-danger">CERRAR</Button>
              <Button type="submit" variant="outline-success">CONFIRMAR</Button>
            </Form>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmpresasSucursal;
