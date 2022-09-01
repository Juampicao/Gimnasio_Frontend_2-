import React, { useState, useEffect } from "react";
import Header from "../atoms/Header";
import ContenedorLayout from "../molecules/ContenedorLayout";

import axios from "axios";
import useEstadisticas from "../../hooks/useEstadisticas";
import CuadroEstadisticas from "../atoms/CuadroEstadisticas";
import Spiner from "../atoms/Spiner";
import useGeneral from "../../hooks/useGeneral";
import Modal from "../atoms/Modal";
import FormularioSuscripciones from "../molecules/suscripciones/FormularioSuscripciones";
import Suscripcion from "../molecules/suscripciones/Suscripcion";
import FormularioPostDeleteSuscripcion from "../molecules/suscripciones/FormularioPostDeleteSuscripcion";

const Configuraciones = () => {
  const {
    getEstadisticasGenerales,
    isCargando,
    setIsCargando,
    dataSuscriptores,
    getTiposSuscripcion,
    tiposSuscripcion,
  } = useEstadisticas();

  const {
    isOpenModal,
    openModal,
    closeModal,
    isOpenModal1,
    openModal1,
    closeModal1,
  } = useGeneral();

  useEffect(() => {
    getTiposSuscripcion();
    setIsCargando(false);
  }, []);

  const formDeletePost = (e) => {
    e.preventDefault();
    console.log("desde formDeletePost");
  };

  // const inputs = [
  //   {
  //     title: "",
  //     placeholder: "escribi tu nombre",
  //     label: "Vieja Suscripcion",
  //     type: "text",
  //     onChange: "",
  //     value: "",
  //   },
  //   {
  //     title: "",
  //     placeholder: "escribi Tu suscripcion",
  //     label: "Nueva Suscripcion",
  //     type: "select",
  //     array: tiposSuscripcion,
  //     onChange: "setNuevaSuscripcion",
  //     value: "",
  //   },
  // ];
  return (
    <div>
      <Header title="Configuraciones" />
      {isCargando ? (
        <Spiner />
      ) : (
        <ContenedorLayout>
          <div className="">
            <h2 className="font-bold text-xl mb-5">Suscripciones</h2>
            <div className="grid gap-y-5">
              {tiposSuscripcion
                ? tiposSuscripcion.map((suscripcion) => {
                    return (
                      <Suscripcion
                        key={suscripcion.uid}
                        suscripcion={suscripcion}
                        tiposSuscripcion={tiposSuscripcion}
                      />
                    );
                  })
                : "no hay"}
            </div>
          </div>

          <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <FormularioSuscripciones />
          </Modal>

          {/* <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
            <FormularioPostDeleteSuscripcion
              handleSubmit={formDeletePost}
              inputs={inputs}
            />
          </Modal> */}
          <h2 className="font-bold text-xl mb-5">Nombre Gimnasio</h2>
        </ContenedorLayout>
      )}
    </div>
  );
};

export default Configuraciones;
