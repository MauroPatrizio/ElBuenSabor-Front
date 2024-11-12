import  { FC, useEffect, useState } from 'react'
import { IAlergenos } from '../../../types/dtos/alergenos/IAlergenos';
import { Table } from 'react-bootstrap';
import ModalCrearAlergeno from '../../modals/Alergeno/ModalCrearAlergeno/ModalCrearAlergeno';
import ModalEditarAlergeno from '../../modals/Alergeno/ModalEditarAlergeno/ModalEditarAlergeno';

interface IListaAlergenosProps {
	alergenos: IAlergenos[];
}

const AlergenosList: FC<IListaAlergenosProps> = ({alergenos}) => {
  const [listaAlergenos, setListaAlergenos] = useState<IAlergenos[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAlergenoId, setSelectedAlergenoId] = useState<number | null>(null);

	useEffect(() => {
		setListaAlergenos(alergenos);
	}, [alergenos]);

    const [mostrarPopUp, setMostrarPopUp] = useState<boolean>(false);

	const handleOpenPopUp = () => {
		setMostrarPopUp(true);
	};

	const handleClosePopUp = () => {
		setMostrarPopUp(false);
	};

    //handle Edit
    const selectedAlergeno = alergenos.find((alergeno) => alergeno.id === selectedAlergenoId);
    const handleEditClick = (id: number) => {
        console.log(id)
        setSelectedAlergenoId(id);
        setMostrarPopUp(true);
      };
    
      const handleCloseModal = () => {
        setMostrarPopUp(false);
        setSelectedAlergenoId(null); // Limpiar el id seleccionado al cerrar el modal
      };

  return (
    <div>
        <h3>ALERGENOS</h3>
        <button onClick={handleOpenPopUp}>Agregar alergeno</button>
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
                            <button onClick={()=>handleEditClick(alergeno.id)}>editar</button>
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
      {mostrarPopUp && (
        <>
            <ModalCrearAlergeno
                show={mostrarPopUp}
                onHide={handleClosePopUp}
            />
        </>
    )}

    {/* Modal Editar */}
			{openEditModal && (
				selectedAlergeno && (
                    <ModalEditarAlergeno
                      show={mostrarPopUp}
                      onHide={handleCloseModal}
                      alergeno={selectedAlergeno}
                    />
                  )
			)}
    </div>
  )
}

export default AlergenosList
