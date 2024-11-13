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
        <Navbar className={style.NavHeader}>
          <Container>
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

    
        {/* Contenido de la pestaña activa */}
        <div className="content-area">
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

