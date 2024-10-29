// AdminEmpresasSucursal.tsx

import React, { useState } from "react";
import style from "./AdminEmpresasSucursal.module.css";
import ModalSucursal from "../../Modals/ModalSucursal/ModalSucursal";
import { SucursalList } from "../../Modals/ModalSucursal/SucursalList";
import { ISucursal } from "../../../types/Sucursal";
import ModalEmpresa from "../../Modals/ModalEmpresa/ModalEmpresa";
import CardEmpresa from "../../ui/EmpresaCard/EmpresaCard";
import { Button } from "react-bootstrap";

interface FormData {
  nombreEmpresa: string;
  razonSocial: string;
  cuit: number | "";
}

const AdminEmpresasSucursal = () => {
  const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nombreEmpresa: "",
    razonSocial: "",
    cuit: "",
  });
  const [datosGuardados, setDatosGuardados] = useState<FormData[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState<FormData | null>(null);
  const [modoEdicion, setModoEdicion] = useState<boolean>(false);

  const handleOpenPopUp = () => {
    setFormData({ nombreEmpresa: "", razonSocial: "", cuit: "" });
    setModoEdicion(true);
    setEmpresaSeleccionada(null);
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
    if (modoEdicion && empresaSeleccionada) {
      setDatosGuardados(
        datosGuardados.map((dato) =>
          dato === empresaSeleccionada ? formData : dato
        )
      );
    } else {
      setDatosGuardados([...datosGuardados, formData]);
    }
    handleClosePopUp();
    setFormData({ nombreEmpresa: "", razonSocial: "", cuit: "" });
    setModoEdicion(false);
    setEmpresaSeleccionada(null);
  };

  const handleVerEmpresa = (empresa: FormData) => {
    setEmpresaSeleccionada(empresa);
    setMostrarPopUp(true);
    setModoEdicion(false);
  };

  const handleEditarEmpresa = (empresa: FormData) => {
    setEmpresaSeleccionada(empresa);
    setFormData(empresa);
    setMostrarPopUp(true);
    setModoEdicion(true);
  };


  //SUCURSALES
  const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [sucursales, setSucursales] = useState<ISucursal[]>([]);
	const handleAddSucursal = (nuevaSucursal: ISucursal) => {
		setSucursales((prevSucursales) => [...prevSucursales, nuevaSucursal]);
	};


  return (
    <div>
      <div className={style.containerEmpresaSucursal}>
        <div className={style.containerEmpresa}>
          <h3>Empresa</h3>
          <Button onClick={handleOpenPopUp}>Agregar empresa</Button>
          <div className={style.listEmpresas}>
            {datosGuardados.length > 0 ? (
              datosGuardados.map((dato) => (
                <CardEmpresa
                  key={dato.cuit}
                  dato={dato}
                  handleVerEmpresa={handleVerEmpresa}
                  handleEditarEmpresa={handleEditarEmpresa}
                />
              ))
            ) : (
              <div>
                <h2>No hay empresas creadas</h2>
              </div>
            )}
          </div>
        </div>
        <div className={style["div-container-sucursal"]}>
          <h3>Sucursales</h3>
          <Button onClick={handleOpen}>Crear sucursal</Button>
          <div>
            <ModalSucursal
              handleOpen={open}
              handleClose={handleClose}
              onAddSucursal={handleAddSucursal}
            />
          </div>
          <div>
            <SucursalList sucursales={sucursales} />
          </div>
        </div>
      </div>
      <ModalEmpresa
        mostrarPopUp={mostrarPopUp}
        formData={formData}
        modoEdicion={modoEdicion}
        empresaSeleccionada={empresaSeleccionada}
        manejarCambio={manejarCambio}
        manejarSubmit={manejarSubmit}
        handleClosePopUp={handleClosePopUp}
      />
    </div>
  );
};

export default AdminEmpresasSucursal;
