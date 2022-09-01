import React, { useEffect, useState } from "react";
import useGeneral from "../../../hooks/useGeneral";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spiner from "../../atoms/Spiner";
import { formatearFecha } from "../../../helpers/funciones";
import { BotonPrimario } from "../../atoms/Botones";
import { BotonBlancoRedondeado } from "../../../helpers/colores";

const VerPagoSuscripcion = () => {
  const { setIsOpenErrorModal, setIsCargando, isCargando, handleBack } =
    useGeneral();

  const [isCargando2, setIsCargando2] = useState(true);
  const [metodoPago, setMetodoPago] = useState("");
  const [notasPagoSuscripcion, setNotasPagoSuscripcion] = useState("");
  const [montoPagoSuscripcion, setMontoPagoSuscripcion] = useState("");
  const [fechaPagoSuscripcion, setFechaPagoSuscripcion] = useState("");

  const params = useParams();

  const GetPagoSuscripcionId = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/pagos/pagarsuscripcion/${params.id}`,
        config
      );
      console.log(data.pagoUnico);
      setMetodoPago(data.pagoUnico.metodoPago);
      setNotasPagoSuscripcion(data.pagoUnico.notasPagoSuscripcion);
      setMontoPagoSuscripcion(data.pagoUnico.montoPagoSuscripcion);
      setFechaPagoSuscripcion(data.pagoUnico.fechaPagoSuscripcion);
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
    setIsCargando(false);
  };

  useEffect(() => {
    GetPagoSuscripcionId();
  }, []);

  // styles
  const propiedadTituloStyles = "font-bold";
  const liStyles = "";
  const titleStlyes = "font-bold text-xl uppercase py-2";

  return (
    <>
      {isCargando ? (
        <Spiner />
      ) : (
        <div>
          <ul className="p-5 xs:p-0 space-y-3">
            <h3 className={titleStlyes}>Informacion Personal</h3>
            <li className={liStyles}>
              <p className={propiedadTituloStyles}> Metodo de Pago:</p>
              {metodoPago}
            </li>
            <li className={liStyles}>
              <p className={propiedadTituloStyles}> Monto Pago Suscripcion:</p>$
              {montoPagoSuscripcion}
            </li>

            <li className={liStyles}>
              <p className={propiedadTituloStyles}> Notas:</p>
              {notasPagoSuscripcion ? notasPagoSuscripcion : "No hay notas..."}
            </li>
            <li className={liStyles}>
              <p className={propiedadTituloStyles}> Fecha:</p>
              {formatearFecha(fechaPagoSuscripcion)}
            </li>
          </ul>
          <div className="py-5 flex justify-center space-x-3">
            <BotonPrimario
              Color={BotonBlancoRedondeado}
              value="Editar Suscriptor"
              //   onClick={() => navigate(`/suscriptores/editar/${params.id}`)}
              onClick={() =>
                alert("No se puede realizar esta opcion por el momento")
              }
            />
            <BotonPrimario
              Color={BotonBlancoRedondeado}
              value="Volver Atras"
              type="button"
              onClick={() => {
                handleBack();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerPagoSuscripcion;
