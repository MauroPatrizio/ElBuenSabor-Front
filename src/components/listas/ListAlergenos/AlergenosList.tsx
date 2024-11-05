import  { FC, useEffect, useState } from 'react'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import { Table } from 'react-bootstrap';
interface IListaAlergenosProps {
	alergenos: IAlergenos[];
}
const AlergenosList: FC<IListaAlergenosProps> = ({alergenos}) => {
  const [listaAlergenos, setListaAlergenos] = useState<IAlergenos[]>([]);

	useEffect(() => {
		setListaAlergenos(alergenos);
	}, [alergenos]);

  return (
    <div>
      <div>
    
      {listaAlergenos.length > 0 ? (
    <div>
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {listaAlergenos.map((alergeno, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{alergeno.denominacion}</td>
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
    <div>No hay alergenos creados</div>
)}
       
      </div>
    </div>
  )
}

export default AlergenosList
