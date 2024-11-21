import React, { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { productoService } from "../../../../services/productoService";
import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { categoriaService } from "../../../../services/categoriaService";

interface IModalCrearProductoProps {
  show: boolean;
  onHide: () => void;
}
interface ISubCategoria {
  id: number;
  denominacion: string;
  eliminado: boolean;
}

export const ModalCrearProducto: FC<IModalCrearProductoProps> = ({
  show,
  onHide,
}) => {
  const [formData, setFormData] = useState<ICreateProducto>({
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: true,
    codigo: "",
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
  });

  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [subCategorias, setSubCategorias] = useState<ISubCategoria[]>([]);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await categoriaService.getAllCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    if (show) fetchCategorias(); // Cargar categorías solo si el modal está abierto.
  }, [show]);

  const handleCategoriaChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoriaId = Number(e.target.value);
    setSelectedCategoriaId(categoriaId);

    if (categoriaId === 0) {
      setSubCategorias([]); // Limpia subcategorías si no se selecciona una categoría válida.
      setFormData((prev) => ({ ...prev, idCategoria: 0 })); // Restablece la subcategoría seleccionada
      return;
    }

    try {
      const subCats = await categoriaService.getSubcategoriasByCategoriaId(
        categoriaId
      );
      setSubCategorias(subCats.filter((subCat) => !subCat.eliminado)); // Filtrar subcategorías no eliminadas.
    } catch (error) {
      console.error("Error al cargar subcategorías:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Verificar que se haya seleccionado una categoría y una subcategoría
    if (!selectedCategoriaId || formData.idCategoria === 0) {
      Swal.fire({
        icon: "warning",
        title: "Debe seleccionar una categoría y una subcategoría",
      });
      return;
    }

    try {
      await productoService.createProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
      });
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubCategoriaChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subCategoriaId = Number(e.target.value);
    setFormData((prev) => ({ ...prev, idCategoria: subCategoriaId }));
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="denominacion">
            <Form.Label>Denominación</Form.Label>
            <Form.Control
              type="text"
              name="denominacion"
              value={formData.denominacion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="precioVenta">
            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              type="number"
              name="precioVenta"
              value={formData.precioVenta}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="habilitado">
            <Form.Check
              type="checkbox"
              name="habilitado"
              label="Habilitado"
              checked={formData.habilitado}
              onChange={handleCheckboxChange}
            />
          </Form.Group>

          <Form.Group controlId="categoriaPadre">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="categoriaPadre"
              value={selectedCategoriaId || 0}
              onChange={handleCategoriaChange}
              required
            >
              <option value={0}>Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.denominacion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="idCategoria">
            <Form.Label>Subcategoría</Form.Label>
            <Form.Control
              as="select"
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleSubCategoriaChange}
              required
              disabled={subCategorias.length === 0} 
            >
              <option value={0}>Seleccionar subcategoría</option>
              {subCategorias.map((subCat) => (
                <option key={subCat.id} value={subCat.id}>
                  {subCat.denominacion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
