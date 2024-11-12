import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./ViewAdmin.module.css";
import CategorieList from "../../listas/ListCategories/CategorieList";
import ProductList from "../../listas/ListProducts/ProductList";
import AlergenosList from "../../listas/ListAlergenos/AlergenosList";
import { IProductos } from "../../../types/dtos/productos/IProductos";
import { productoService } from "../../../services/productoService";
import { categoriaService } from "../../../services/categoriaService";
import { alergenoService } from "../../../services/alergenoService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";
import ModalCrearProducto from "../../modals/Producto/ModalCrearProducto/ModalCrearProducto";
import ModalCrearAlergeno from "../../modals/Alergenos/ModalCrearAlergenos/ModalCrearAlergeno";
import ModalCrearCategoria from "../../modals/Categorias/ModalCrearCategoria/ModalCrearCategoria";

const ViewAdmin: React.FC = () => {
  const [productos, setProductos] = useState<IProductos[]>([]);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [activeTab, setActiveTab] = useState<"Categorias" | "Productos" | "Alergenos">("Categorias");
  const navigate = useNavigate();
  const location = useLocation();
  const { branchName } = location.state || [];

  const handleTabChange = (tab: "Categorias" | "Productos" | "Alergenos") => {
    setActiveTab(tab);
  };

  const handleHomeRedirect = () => {
    navigate("/"); //VUELVE AL HOME 
  };

  // Estados para controlar la visibilidad de cada modal
  const [showProductoModal, setShowProductoModal] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [showAlergenoModal, setShowAlergenoModal] = useState(false);

  // Abre el modal según la pestaña activa
  const handleOpenModal = () => {
    if (activeTab === "Productos") setShowProductoModal(true);
    else if (activeTab === "Categorias") setShowCategoriaModal(true);
    else if (activeTab === "Alergenos") setShowAlergenoModal(true);
  };

  // Cierra los modales
  const handleCloseModals = () => {
    setShowProductoModal(false);
    setShowCategoriaModal(false);
    setShowAlergenoModal(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        switch (activeTab) {
          case "Categorias":
            const categoriaDatos = await categoriaService.getAllCategorias();
            setCategorias(categoriaDatos);
            break;
          case "Productos":
            const productoDatos = await productoService.getAllProductos();
            setProductos(productoDatos);
            break;
          case "Alergenos":
            const alergenoDatos = await alergenoService.getAllAlergenos();
            setAlergenos(alergenoDatos);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch();
  }, [activeTab]);

  return (
    <div className={style.principalContainerAdmin}>
      <header>
        <Navbar expand="lg">
          <Container className={style.NavHeader}>
            <button className={style.backButton} onClick={handleHomeRedirect}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Navbar.Text>
                <h3>{branchName ? `Admin - ${branchName}` : 'Admin'}</h3>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <div className={style.adminContainer}>
        <div className={style.adminMenu}>
          {/* Botones para cambiar de pestaña */}
          <button
            onClick={() => handleTabChange("Categorias")}
            className={`${style.menuButton} ${activeTab === "Categorias" ? style.active : ""}`}
          >
            Categorias
          </button>
          <button
            onClick={() => handleTabChange("Productos")}
            className={`${style.menuButton} ${activeTab === "Productos" ? style.active : ""}`}
          >
            Productos
          </button>
          <button
            onClick={() => handleTabChange("Alergenos")}
            className={`${style.menuButton} ${activeTab === "Alergenos" ? style.active : ""}`}
          >
            Alergenos
          </button>
        </div>

        {/* Modales */}
        {showProductoModal && (
          <ModalCrearProducto show={showProductoModal} onHide={handleCloseModals} />
        )}
        {showCategoriaModal && (
          <ModalCrearCategoria show={showCategoriaModal} onHide={handleCloseModals} />
        )}
        {showAlergenoModal && (
          <ModalCrearAlergeno show={showAlergenoModal} onHide={handleCloseModals} />
        )}

        {/* Contenido de la pestaña activa */}
        <div className="content-area">
          <h3>{activeTab.toUpperCase()}</h3>
          <button onClick={handleOpenModal}>AGREGAR {activeTab.toUpperCase()}</button>

          <div>
            {activeTab === "Categorias" && <CategorieList categorias={categorias} />}
            {activeTab === "Productos" && <ProductList productos={productos} />}
            {activeTab === "Alergenos" && <AlergenosList alergenos={alergenos} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdmin;


export default ViewAdmin;
