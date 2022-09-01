import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGeneral from "../../../hooks/useGeneral";
import { BotonEditar, BotonEliminar, BotonVer } from "../../atoms/Botones";
import axios from "axios";
import { estadoSuscripcionStyles } from "../../../helpers/styles";
import Spiner from "../../atoms/Spiner";
import { formatearFecha } from "../../../helpers/funciones";

const Suscriptor = ({ suscriptor }) => {
  const {
    isCargando,
    setIsCargando,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    isOpenSaveModal,
    setIsOpenSaveModal,
    isOpenErrorModal,
    setIsOpenErrorModal,
    setSuscriptores,
    suscriptores,
  } = useGeneral();

  const navigate = useNavigate();

  const { _id, nombre, estado, fechas, rutina } = suscriptor;

  const handleDelete = async (id) => {
    const confirmar = confirm(`Desea eliminar el suscriptor "${nombre}"?`);
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.delete(
          `${import.meta.env.VITE_API_URL}/suscriptores/${id}`,
          config
        );
        const arraySuscriptores = suscriptores.filter(
          (suscriptor) => suscriptor._id !== _id
        );
        setSuscriptores(arraySuscriptores);
        setIsOpenDeleteModal(true);
      } catch (error) {
        console.log(error);
        setIsOpenErrorModal(!isOpenErrorModal);
      }
    }
    setIsCargando(false);
  };

  return (
    <>
      {isCargando ? (
        <Spiner />
      ) : (
        <tr className="hover:bg-gray-300 ">
          <td className="text-indigo-700 font-bold">
            {nombre ? nombre.slice(0, 3) : ""}
          </td>
          <td className="p-1">
            <p>{nombre}</p>
          </td>
          <td className="p-1">
            <p className={estadoSuscripcionStyles[estado]}>{estado}</p>
          </td>
          {fechas ? (
            <td>{formatearFecha(fechas.fechaVencimientoSuscripcion)}</td>
          ) : (
            ""
          )}
          <td className=" ">
            <div className=" ">
              <BotonVer
                value="Ver"
                onClick={() => navigate(`/suscriptores/${_id}`)}
              />
              <BotonEditar
                value="Editar"
                onClick={() => navigate(`/suscriptores/editar/${_id}`)}
              />
              <BotonEliminar
                value="Eliminar"
                onClick={() => handleDelete(_id)}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Suscriptor;
