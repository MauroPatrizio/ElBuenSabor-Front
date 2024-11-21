import React, { FC, useState } from "react";
import Swal from "sweetalert2";
import { IAlergenos } from "../../../../types/dtos/alergenos/IAlergenos";


interface ModalEditarAlergenoProps {
  allergen: IAlergenos | null;
  updateAllergenWithImage: (
    file: File | null,
    allergen: IAlergenos,
    name?: string
  ) => Promise<void>;
  onClose: () => void;
}

export const ModalEditarALergeno: FC<ModalEditarAlergenoProps> = ({
  allergen,
  updateAllergenWithImage,
  onClose,
}) => {
  const [name, setName] = useState(allergen?.denominacion || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (allergen) {
      setLoading(true); 
      try {
        await updateAllergenWithImage(image, allergen, name);
        Swal.fire({
          icon: "success",
          title: "Confirmado!",
          text: `El alergeno ${name} ha sido actualizado con éxito!`,
          background: "#313131",
          color: "white",
        });
        onClose();
      } catch (error) {
        console.error("Error al actualizar el alérgeno:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar el alérgeno.",
          background: "#313131",
          color: "white",
        });
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(1px)",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          width: "600px",
          height: "350px",
          padding: "10px",
          borderRadius: "5px",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          gap: "0px",
          border: "1px solid white",
          textAlign: "center",
        }}
      >
        <h2>Actualizar Alérgeno</h2>
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "500px",
            backgroundColor: "black",
            border: "1px solid white",
            color: "white",
          }}
          type="text"
          name="name"
          placeholder="Ingresa una denominación"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "500px",
            height: "100px",
            borderRadius: "5px",
            border: "1px solid white",
            padding: "10px",
            gap: "100px",
          }}
        >
          <input
            accept="image/*"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="currentColor"
            className="bi bi-camera"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f44336", 
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading} 
          >
            {loading ? "Cargando..." : "Cancelar"}
          </button>
          <button
            onClick={handleUpdate}
            style={{
              backgroundColor: "#4CAF50", 
              color: "white",
              borderRadius: "10px",
              width: "150px",
              border: "1px solid white",
              padding: "10px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}  
          >
            {loading ? "Cargando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarALergeno;