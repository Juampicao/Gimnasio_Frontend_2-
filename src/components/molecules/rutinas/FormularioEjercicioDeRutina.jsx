import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { numeros } from "../../../helpers/funciones";
import { inputStyles } from "../../../helpers/styles";
import useGeneral from "../../../hooks/useGeneral";
import ContenedorFormularios from "../ContenedorFormularios";

const FormularioEjerciciodeRutina = () => {
  const { getAllEjercicios, ejercicios, postEjercicioDeRutina } = useGeneral();
  const [ejercicio, setEjercicio] = useState("");
  const [repeticiones, setRepeticiones] = useState(1);
  const [series, setSeries] = useState(1);
  const [dias, setDias] = useState("Lunes");

  const [ejercicioABuscar, setEjercicioABuscar] = useState("");

  const params = useParams();

  const objeto = {
    ejercicio,
    repeticiones,
    dias,
    series,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(objeto);
  };

  let numeros = [];
  let buscarNumeros = () => {
    for (let i = 1; i <= 15; i++) {
      let result = i;
      numeros.push(result);
    }
  };

  buscarNumeros();
  function prueba() {
    console.log(objeto);
    postEjercicioDeRutina(params.id, objeto);
  }

  useEffect(() => {
    getAllEjercicios();
  }, []);

  const obtenerEjercicioPorNombre = (e) => {
    const iterarEjercicio = () => {
      for (let i = 0; i < ejercicios.length; i++) {
        console.log(ejercicios[i].nombre);
        if (ejercicios[i].nombre === e) {
          setEjercicioABuscar(ejercicios[i]);
          setEjercicio(ejercicios[i]._id);
        }
      }
    };
    iterarEjercicio();
  };

  return (
    <div className="bg-white rounded-lg  max-w-xl mx-auto">
      <ContenedorFormularios>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="grid gap-y-3 sm:gap-y-5 grid-cols-1 items-center p-5  sm:p-10"
        >
          <div>
            <label> Ejercicio </label>
            <input
              type="search"
              id="suscriptor"
              name="suscriptor"
              list="listaEjercicio"
              autoComplete="off"
              className={inputStyles}
              placeholder="escriba el nombre.."
              onChange={(e) => {
                obtenerEjercicioPorNombre(e.target.value);
              }}
            />
            <datalist id="listaEjercicio">
              {ejercicios
                ? ejercicios.map((ejercicio) => (
                    <option value={ejercicio.nombre} key={ejercicio._id}>
                      {ejercicio.nombre}
                    </option>
                  ))
                : ""}
            </datalist>
          </div>
          <div>
            <label> Repeticiones </label>
            <select
              name=""
              id=""
              as="select"
              className={inputStyles}
              onChange={(e) => setRepeticiones(e.target.value)}
            >
              {numeros
                ? numeros.map((e) => {
                    return <option value={e}>{e}</option>;
                  })
                : ""}
            </select>
          </div>
          <div>
            <label> Series </label>
            <select
              name=""
              id=""
              as="select"
              className={inputStyles}
              onChange={(e) => setSeries(e.target.value)}
            >
              {numeros
                ? numeros.map((e) => {
                    return <option value={e}>{e}</option>;
                  })
                : ""}
            </select>
          </div>
          <div>
            <label> Dias </label>
            <select
              name=""
              id=""
              as="select"
              className={inputStyles}
              onChange={(e) => setDias(e.target.value)}
            >
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miercoles">Miercoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sabado">Sabado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>
          <input
            type="submit"
            onClick={() => {
              prueba();
            }}
            className="bg-green-800 rounded-xl text-white px-3 py-1.5"
            value="Agregar"
          />
        </form>
      </ContenedorFormularios>
    </div>
  );
};

export default FormularioEjerciciodeRutina;
