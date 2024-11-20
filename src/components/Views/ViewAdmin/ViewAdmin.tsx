import React, { useEffect, useState } from "react";
import { Container, Navbar, Button, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
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
	const [activeTab, setActiveTab] = useState<"Categorias" | "Productos" | "Alergenos">(
		"Categorias"
	);
	const navigate = useNavigate();
	const location = useLocation();
	const { branchName } = location.state || [];

	const handleTabChange = (tab: "Categorias" | "Productos" | "Alergenos") => {
		setActiveTab(tab);
	};

	const handleHomeRedirect = () => {
		navigate("/");
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
		<div style={{ backgroundColor: "#f5efeb", minHeight: "100vh" }}>
			<header>
				<Navbar
					style={{ backgroundColor: "#567C8D" }}
					expand="lg"
					className="mb-3"
				>
					<Container>
						<Button
							variant="outline-light"
							onClick={handleHomeRedirect}
						>
							<span className="material-symbols-outlined">arrow_back</span>
						</Button>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse
							id="basic-navbar-nav"
							className="justify-content-center"
						>
							<Navbar.Text style={{ color: "#fff", fontWeight: "bold" }}>
								<h3>{branchName ? `Admin - ${branchName}` : "Admin"}</h3>
							</Navbar.Text>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>

			<Tabs
				activeKey={activeTab}
				onSelect={(k) =>
					k && handleTabChange(k as "Categorias" | "Productos" | "Alergenos")
				}
				id="admin-tabs"
				className="mb-3"
				justify
				style={{ backgroundColor: "lightgray", fontWeight: "bold" }}
			>
				<Tab
					eventKey="Categorias"
					title="Categorias"
				>
					<CategorieList categorias={categorias} />
				</Tab>
				<Tab
					eventKey="Productos"
					title="Productos"
				>
					<ProductList productos={productos} />
				</Tab>
				<Tab
					eventKey="Alergenos"
					title="Alérgenos"
				>
					<AlergenosList alergenos={alergenos} />
				</Tab>
			</Tabs>
		</div>
	);
};

export default ViewAdmin;
