import React, { useEffect } from "react";
import { BotonEliminar, BotonVer, BotonEditar } from "../../atoms/Botones";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useGeneral from "../../../hooks/useGeneral";
import { formatearFecha } from "../../../helpers/funciones";
import { botonDivStyles } from "../../../helpers/styles";

const Rutina = ({ rutina }) => {
  const {
    setIsOpenSaveModal,
    setIsOpenErrorModal,
    handleDeleteEjercicioDeRutina,
  } = useGeneral();

  const { id } = useParams();
  const params = useParams();
  const navigate = useNavigate();

  const { ejercicio, repeticiones, dias, nombreEjercicio, series } = rutina;

  return (
    <>
      <tr>
        <td>{nombreEjercicio ? nombreEjercicio : "No hay ninguna rutina "}</td>
        <td>{repeticiones ? repeticiones : ""}</td>
        <td>{series ? series : ""}</td>

        <td>{dias ? dias : ""}</td>

        <td className=" ">
          <div className=" ">
            <BotonVer
              value="Ver"
              // onClick={() =>
              //   navigate(`/suscriptores/pagosuscripcion/${pago._id}`)
              // }
              onClick={() =>
                alert("No se puede realizar esta opcion por el momento")
              }
            />
            <BotonEditar
              value="Editar"
              // onClick={() =>
              //   navigate(`/suscriptores/editar/${_id}`)
              // }
              onClick={() =>
                alert("No se puede realizar esta opcion por el momento")
              }
            />
            <BotonEliminar
              value="Eliminar"
              onClick={() =>
                handleDeleteEjercicioDeRutina(
                  params.id,
                  ejercicio,
                  nombreEjercicio
                )
              }
              // onClick={() =>
              //   alert("No se puede realizar esta opcion por el momento")
              // }
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default Rutina;
