import React, { ChangeEvent, FC, useState } from 'react'
import { IProductos } from '../../../../types/dtos/productos/IProductos';
import { IUpdateProducto } from '../../../../types/dtos/productos/IUpdateProducto';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { productoService } from '../../../../services/productoService';
import ProductList from '../../../listas/ListProducts/ProductList';

interface IModalEditarProductoProps {
	show: boolean;
	onHide: () => void;
	producto: IProductos;
}

const ModalEditarProducto:FC<IModalEditarProductoProps> = ({show, onHide, producto}) => {
    const [formData, setFormData] = useState<IUpdateProducto>({
        id: producto.id,
        denominacion: producto.denominacion,
        precioVenta: producto.precioVenta,
        descripcion: producto.descripcion,
        habilitado: producto.habilitado,
        codigo: producto.codigo,
        idCategoria: producto.categoria.id, 
        idAlergenos: producto.alergenos.map((alergeno) => alergeno.id),
        imagenes: producto.imagenes,
      });
    
      const [productoEditable, setProductoEditable] = useState<IProductos>(producto);

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
    
        const isCheckbox = type === "checkbox";
        const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
    
        try {
            
            await productoService.updateProduct(producto.id,formData) ; 
            Swal.fire({
                icon: "success",
                title: "Producto editado correctamente",
            });
            onHide();


        } catch (error) {
            console.error("Error al editar producto:", error);
            Swal.fire({
                icon: "error",
                title: "Error al editar el producto",
                text: "Intente nuevamente más tarde.",
            });
        }
    };
      
    console.log(producto.denominacion)
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Crear Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form >
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
            />
          </Form.Group>

          <Form.Group controlId="idCategoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="idCategoria"
              value={formData.idCategoria}
              onChange={handleChange}
              required
            >
              <option value={0}>Seleccionar categoría</option>
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
  )
}

export default ModalEditarProducto
