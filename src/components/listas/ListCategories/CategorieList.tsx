import  { FC, useEffect, useState } from 'react'
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';
import { Table } from 'react-bootstrap';
import ModalCrearCategoria from '../../modals/Categoria/ModalCrearCategoria/ModalCrearCategoria';

interface IListaCategoriasProps {
	categorias: ICategorias[];
}

const CategorieList: FC<IListaCategoriasProps> = ({categorias}) => {

    const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);

	useEffect(() => {
		setListaCategorias(categorias);
	}, [categorias]);

    const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

  return (
    <div>
        <h3>CATEGORIAS</h3>
        <button onClick={handleOpenPopUp}>Agregar Categoria</button>
      <div>
      {listaCategorias.length > 0 ? (
    <div>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Denominacion</th>
                    <th>Eliminado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaCategorias.map((categorias, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{categorias.denominacion}</td>
                        <td>{categorias.eliminado ? "Sí" : "No"}</td>
                        <td>
                            <button>editar</button>
                            <button>eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
) : (
    <div>No hay categorias creadas</div>
)}
       
      </div>
      {mostrarPopUp && (
        <>
            <ModalCrearCategoria
                show={mostrarPopUp}
                onHide={handleClosePopUp}
            />
        </>
    )}
    </div>
     
  )
}

export default CategorieList
