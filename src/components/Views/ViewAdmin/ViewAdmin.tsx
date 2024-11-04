import { useSelector } from "react-redux";
import styles from "./ViewAdmin.module.css";
import { RootState } from "../../../redux/store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useState } from 'react';

const ViewAdmin: React.FC = () => {
  // Estado que guarda la pestaña activa
  const [activeTab, setActiveTab] = useState<'Categorias' | 'Productos' | 'Alergenos'>('Categorias');

  // Función para cambiar la pestaña activa
  const handleTabChange = (tab: 'Categorias' | 'Productos' | 'Alergenos') => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-container">
      <header className="header">
        <button className="back-button">←</button>
        <h1>BENDITO RUFIÁN - LA BARRACA</h1>
      </header>
      <div className="admin-menu">
        {/* Botones para cambiar de pestaña */}
        <button
          onClick={() => handleTabChange('Categorias')}
          className={`menu-button ${activeTab === 'Categorias' ? 'active' : ''}`}
        >
          Categorias
        </button>
        <button
          onClick={() => handleTabChange('Productos')}
          className={`menu-button ${activeTab === 'Productos' ? 'active' : ''}`}
        >
          Productos
        </button>
        <button
          onClick={() => handleTabChange('Alergenos')}
          className={`menu-button ${activeTab === 'Alergenos' ? 'active' : ''}`}
        >
          Alergenos
        </button>
      </div>

      {/* Contenido de la pestaña activa */}
      <div className="content-area">
        {activeTab === 'Categorias' && <p>Contenido de Categorías</p>}
        {activeTab === 'Productos' && <p>Contenido de Productos</p>}
        {activeTab === 'Alergenos' && <p>Contenido de Alérgenos</p>}
      </div>
    </div>
  );
};

export default ViewAdmin;
