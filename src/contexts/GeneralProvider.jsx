import React from "react";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import {
  ModalEliminado,
  ModalError,
  ModalGuardado,
} from "../components/atoms/ModalNotificacion";

import Spiner from "../components/atoms/Spiner";
import { useNavigate } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import Modal from "../components/atoms/Modal";
import FormularioSuscripciones from "../components/molecules/suscripciones/FormularioSuscripciones";

const GeneralContext = createContext();

const GeneralProvider = ({ children }) => {
  const navigate = useNavigate();
  // // Datos configuracion & Autenticacion
  const token = localStorage.getItem("token");
  if (!token) return;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const [isActiveMenu, setActiveMenu] = useState(true);
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);

  const [isCargando, setIsCargando] = useState(true);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

  const [suscriptores, setSuscriptores] = useState("");
  const [suscriptor, setSuscriptor] = useState("");
  const [pagosSuscriptorId, setPagosSuscriptorId] = useState("");
  const [todosPagosSuscripcion, setTodosPagosSuscripcion] = useState([""]);

  const [tiposSuscripcion, setTiposSuscripcion] = useState({});
  const [buscador, setBuscador] = useState(false);
  const [seleccionarSuscripcion, setSeleccionarSuscripcion] = useState({});

  const [ejercicios, setEjercicios] = useState([""]);

  const handleBack = () => navigate(-1);

  const handleBuscador = () => {
    setBuscador(!buscador);
    console.log("Buscando o Cerrando?");
  };

  // --------------------------------- Funciones --------------------------------- //
  // Get Suscriptores
  async function getSuscriptores() {
    setIsCargando(true);
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_API_URL}/suscriptores`,
        config
      );
      setSuscriptores(respuesta.data.suscriptores);
      setSuscriptor("");
    } catch (error) {
      console.log(error);
    }
    setIsCargando(false);
  }

  // Get suscriptor by id
  async function getSuscriptorId(suscriptorId) {
    setSuscriptor("");
    setPagosSuscriptorId("");
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_API_URL}/suscriptores/${suscriptorId}`,
        config
      );
      setSuscriptor(respuesta.data);
      setPagosSuscriptorId(respuesta.data.pagos);
      console.log(respuesta.data);
    } catch (error) {
      console.log(error);
    }
    setIsCargando(true);
  }

  // Submit Suscriptor
  const SubmitSuscriptor = async (suscriptor) => {
    console.log(suscriptor);
    if (suscriptor.idFalso) {
      await EditarSuscriptor(suscriptor);
    } else {
      await NuevoSuscriptor(suscriptor);
    }
  };

  const NuevoSuscriptor = async (suscriptor) => {
    console.log("nuevo...");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/suscriptores`,
        suscriptor,
        config
      );
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
    setIsOpenSaveModal(true);
  };

  const EditarSuscriptor = async (suscriptor) => {
    console.log("editando...");
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/suscriptores/${suscriptor.id}`,
        suscriptor,
        config
      );
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
    setIsOpenSaveModal(true);
  };

  const NuevoPagoSuscripcion = async (nuevoPago) => {
    console.log("Desde nuevo pago suscripcion...");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/pagos/pagarsuscripcion`,
        nuevoPago,
        config
      );
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
    setIsOpenSaveModal(true);
  };

  const GetPagosSuscripcionAll = async (size = 10, page = 1) => {
    setIsCargando(true);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/pagos/pagarsuscripcion/?size=${size}&page=${page}`,
        config
      );
      setTodosPagosSuscripcion(data);
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
    setIsCargando(false);
  };

  const VerificarEstadoDeDeudas = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/suscriptores/verificar/estadodeuda`,
        config
      );
    } catch (error) {
      console.log(error);
    }
    getSuscriptores();
    setIsCargando(false);
  };

  const handleDeletePagoSuscripcion = async (id) => {
    const confirmar = confirm(
      // `Seguro desde eliminar el pago ${id}?`
      `Seguro desde eliminar el pago?`
    );
    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/pagos/pagarsuscripcion/${id}`,
          config
        );
        console.log(data);
        // const arrayPagos = pagosSuscriptorId.filter((pago) => pago._id !== _id);
        // setPagosSuscriptorId(arrayPagos);
      } catch (error) {
        console.log(error);
        setIsOpenErrorModal(true);
      }
      setIsOpenSaveModal(true);
      navigate("/suscriptores");
    }
  };

  const handleDeleteEjercicioDeRutina = async (
    paramsId,
    ejercicioIdd,
    nombre
  ) => {
    const confirmar = confirm(
      `Seguro desde eliminar el ejercicio ${ejercicioIdd} ${nombre} de params ${paramsId}?`
    );
    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `${
            import.meta.env.VITE_API_URL
          }/suscriptores/rutina/${paramsId}?ejercicio=${ejercicioIdd}`,
          config
        );
        console.log(data);
        // const arrayPagos = pagosSuscriptorId.filter((pago) => pago._id !== _id);
        // setPagosSuscriptorId(arrayPagos);
      } catch (error) {
        console.log(error);
        setIsOpenErrorModal(true);
      }
    }
  };

  const getAllEjercicios = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/ejericicios`,
        config
      );
      console.log(data.ejercicios);
      setEjercicios(data.ejercicios);
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
  };

  const postEjercicioDeRutina = async (paramsId, objeto, nombre) => {
    const confirmar = confirm(
      `Seguro desde eliminar el ejercicio ${objeto} ${nombre} de params ${paramsId}?`
    );
    if (confirmar) {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/suscriptores/rutina/${paramsId}`,
          {
            objeto,
          },
          config
        );
        console.log(data);
        // const arrayPagos = pagosSuscriptorId.filter((pago) => pago._id !== _id);
        // setPagosSuscriptorId(arrayPagos);
      } catch (error) {
        console.log(error);
        setIsOpenErrorModal(true);
      }
    }
  };

  // ---------------  TIPOS SUSCRIPCION -----------------//
  async function getTiposSuscripcion() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/usuarios/tipossuscripcion`,
        config
      );
      // setTiposSuscripcion(data.tiposSuscripcion);
      setTiposSuscripcion(data.tiposSuscripcion);
      console.log(data.tiposSuscripcion);
    } catch (error) {
      console.log(error);
    }
    // setIsCargando(false);
  }
  // getTiposSuscripcion();
  async function PostTiposSuscripcion(objeto) {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuarios/tipossuscripcion`,
        {
          objeto,
        },
        config
      );
      console.log(data);
      navigate("/suscriptores");
      setIsOpenSaveModal(true);
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
  }

  async function EditTiposSuscripcion(objeto) {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/usuarios/tipossuscripcion`,
        {
          objeto,
        },
        config
      );
      console.log(data);
      setIsOpenSaveModal(true);
    } catch (error) {
      console.log(error);
      setIsOpenErrorModal(true);
    }
  }

  async function DeleteTiposSuscripcion(
    nombre,
    suscripcionAEliminarId,
    nuevaSuscripcionId
  ) {
    let confirmar = confirm(
      `Vas a eliminar la suscripcion\nid:${suscripcionAEliminarId} nombre: ${nombre}\n\nreemplazada por: "${nuevaSuscripcionId}"`
    );
    if (confirmar) {
      try {
        const { data } = await axios.delete(
          `${
            import.meta.env.VITE_API_URL
          }/usuarios/tipossuscripcion/?suscripcionAEliminarId=${suscripcionAEliminarId}&nuevaSuscripcionId=${nuevaSuscripcionId}`,
          config
        );
        console.log(data);
      } catch (error) {
        console.log(error);
        setIsOpenErrorModal(true);
      }
    }
  }

  return (
    <GeneralContext.Provider
      value={{
        handleBack,
        isActiveMenu,
        setActiveMenu,
        isOpenModal,
        openModal,
        closeModal,
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
        getSuscriptores,
        setSuscriptor,
        suscriptor,
        handleBuscador,
        buscador,
        setBuscador,
        SubmitSuscriptor,
        NuevoSuscriptor,
        EditarSuscriptor,
        NuevoPagoSuscripcion,
        GetPagosSuscripcionAll,
        todosPagosSuscripcion,
        VerificarEstadoDeDeudas,
        getSuscriptorId,
        handleDeletePagoSuscripcion,
        setPagosSuscriptorId,
        pagosSuscriptorId,
        handleDeleteEjercicioDeRutina,
        getAllEjercicios,
        ejercicios,
        postEjercicioDeRutina,
        tiposSuscripcion,
        setTiposSuscripcion,
        getTiposSuscripcion,
        PostTiposSuscripcion,
        EditTiposSuscripcion,
        DeleteTiposSuscripcion,
        isOpenModal1,
        openModal1,
        closeModal1,
        seleccionarSuscripcion,
        setSeleccionarSuscripcion,
      }}
    >
      {isOpenDeleteModal ? (
        <ModalEliminado
          titleModal="¡Eliminado Correctamente!"
          buttonLabel="ir al listado"
          onClick={() => navigate(`/ventas`)}
        />
      ) : (
        ""
      )}
      {isOpenSaveModal ? (
        <ModalGuardado
          titleModal="Guardado!"
          subtitleModal="Puedes ver los cambios en el Listado."
          buttonLabel="Ir al listado"
          // handleClick={handleModalClick}
          // handleClickClose={closeModal}
        />
      ) : (
        ""
      )}
      {isOpenErrorModal ? <ModalError titleModal="Error" /> : " "}
      {/* {isCargando ? <Spiner /> : " "} */}
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralProvider };

export default GeneralContext;
