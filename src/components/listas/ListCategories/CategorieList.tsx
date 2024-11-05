import  { FC, useEffect, useState } from 'react'
import { ICategorias } from '../../../types/dtos/categorias/ICategorias';
import { Table } from 'react-bootstrap';

interface IListaCategoriasProps {
	categorias: ICategorias[];
}

const CategorieList: FC<IListaCategoriasProps> = ({categorias}) => {

    const [listaCategorias, setListaCategorias] = useState<ICategorias[]>([]);

	useEffect(() => {
		setListaCategorias(categorias);
	}, [categorias]);


  return (
    <div>
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
    </div>
  )
}

export default CategorieList
