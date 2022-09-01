import React, { useState, useEffect } from "react";
import useGeneral from "../../../hooks/useGeneral";
import { useModal } from "../../../hooks/useModal";
import { BotonEditar, BotonEliminar } from "../../atoms/Botones";

import CuadroEstadisticas from "../../atoms/CuadroEstadisticas";
import Modal from "../../atoms/Modal";
import FormularioPostDeleteSuscripcion from "./FormularioPostDeleteSuscripcion";
import FormularioSuscripciones from "./FormularioSuscripciones";

const Suscripcion = ({ suscripcion, tiposSuscripcion }) => {
  const {
    openModal,
    closeModal,
    seleccionarSuscripcion,
    setSeleccionarSuscripcion,
  } = useGeneral();

  const [isOpenModal1, openModal1, closeModal1] = useModal(false);

  useEffect(() => {
    closeModal();
    resetForm();
  }, []);

  async function abrirModal(suscripcion) {
    console.log(suscripcion);
    setSeleccionarSuscripcion({
      nombre: suscripcion.nombre,
      valor: suscripcion.valor,
      id: suscripcion._id,
    });
    await openModal();
  }

  const resetForm = async () => {
    setSeleccionarSuscripcion({
      nombre: "",
      valor: "",
      id: "",
    });
  };

  const handleDelete = async (suscripcion) => {
    console.log(suscripcion);
    setSeleccionarSuscripcion({
      nombre: suscripcion.nombre,
      valor: suscripcion.valor,
      id: suscripcion._id,
    });
    let confirmar = confirm(
      `¿Seguro deseas eliminar esta suscripcion: ${suscripcion.nombre}?\n\nHay Suscriptores que estan vinculados a esta suscripcion.\n\nDeberá elegir por cual la reemplaza en todos los casos donde exista "${suscripcion.nombre}" a continuacion`
    );
    if (confirmar) {
      await openModal1();
    }
  };

  const inputs = [
    {
      title: "",
      placeholder: "escribi tu nombre",
      label: "Vieja Suscripcion",
      type: "text",
      onChange: "",
      value: "",
    },
    {
      title: "",
      placeholder: "escribi Tu suscripcion",
      label: "Nueva Suscripcion",
      type: "select",
      array: tiposSuscripcion,
      onChange: "setNuevaSuscripcion",
      value: "",
    },
  ];

  // const returnModal = async (suscripcion) => {
  //   await setNuevaSuscripcion({
  //     nombre: suscripcion.seleccionarSuscripcion,
  //     valor: suscripcion.valor,
  //     uid: suscripcion.uid,
  //     // nombre: "",
  //     // valor: "",
  //     // uid: "",
  //   });
  //   await console.log(suscripcion);
  //   await openModal();
  //   // return (
  //   //   <Modal isOpen={isOpenModal} closeModal={closeModal}>
  //   //     <FormularioSuscripciones nuevaSuscripcion={suscripcion} />
  //   //   </Modal>
  //   // );
  // };

  return (
    <section>
      <div className="max-w-sm  grid grid-cols-2">
        <div>
          <CuadroEstadisticas
            tittle={suscripcion.nombre}
            value={suscripcion.valor}
          />
        </div>

        <div>
          <BotonEditar value="Editar" onClick={() => abrirModal(suscripcion)} />
          <BotonEliminar
            value="Eliminar"
            onClick={() => handleDelete(suscripcion)}
            // onClick={() =>
            //   DeleteTiposSuscripcion(suscripcion.uid, suscripcion.nombre)
            // }
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            resetForm(), openModal();
          }}
        >
          Nueva Suscripcion
        </button>
      </div>
      <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
        <FormularioPostDeleteSuscripcion
          // handleSubmit={formDeletePost}
          inputs={inputs}
          suscripcion={seleccionarSuscripcion}
        />
      </Modal>
    </section>
  );
};

export default Suscripcion;
