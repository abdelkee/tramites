import { AnimatePresence, motion } from "framer-motion";
import {
  MdAccessTime,
  MdClearAll,
  MdComputer,
  MdDone,
  MdLocalFlorist,
} from "react-icons/md";
import { useState } from "react";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "../context/useProvider";
import { FilterType } from "../Types";

function FilterForm() {
  const dispatch = useDispatch();

  const [estado, setEstado] = useState<FilterType["estado"]>(null);
  const [quien, setQuien] = useState<FilterType["quien"]>(null);
  const [donde, setDonde] = useState<FilterType["donde"]>(null);

  const submitFilterValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resE: boolean[] = estado === null ? [true, false] : [estado];
    const resQ: string[] = quien === null ? ["Abdel", "Belkys"] : [quien];
    const resD: string[] = donde === null ? ["MA", "EC"] : [donde];
    dispatch({
      type: "SET_FILTER_VALUES",
      payload: { estado: resE, quien: resQ, donde: resD },
    });
    dispatch({ type: "SET_DRAWER_SHOW", payload: false });
  };
  return (
    <motion.form
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1, easings: ["easeInOut"] }}
      onSubmit={submitFilterValues}
      className={`fixed z-50 flex flex-col top-0 left-0 w-3/4 bg-slate-50 h-screen shadow-lg `}
    >
      <header className="grid w-full text-xl font-semibold tracking-wider h-28 bg-slate-600 place-items-center text-slate-50">
        Filtrar tramites
      </header>

      {/* //* ---- BODY ---- */}
      <div className="flex flex-col justify-between p-4">
        {/* ----------------------------------------------- */}
        <section
          title="<<ESTADO>>"
          className="py-8 border-b border-b-slate-200"
        >
          <h3 className="mb-4 text-lg font-semibold ">
            Estado :{" "}
            <small className="text-slate-500">
              {estado === true
                ? "Completados"
                : estado === false
                ? "Pendientes"
                : "Todo"}
            </small>
          </h3>
          <div className="flex items-center justify-between space-x-2">
            {/* //* ---- PENDING RADIO */}
            <label
              className={`${
                estado === false
                  ? "bg-orange-500 text-slate-50"
                  : "bg-slate-50 text-orange-500"
              } label-radio border border-orange-500 `}
            >
              <MdAccessTime size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"false"}
                onChange={(e) => setEstado(false as FilterType["estado"])}
              />
            </label>

            {/* //* ---- COMPLETED RADIO */}
            <label
              className={`${
                estado
                  ? "bg-green-500 text-slate-50"
                  : "bg-slate-50 text-green-500"
              } label-radio border border-green-500`}
            >
              <MdDone size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"true"}
                onChange={(e) => setEstado(true as FilterType["estado"])}
              />
            </label>

            {/* //* ---- ALL RADIO */}
            <label
              className={`${
                estado === null
                  ? "bg-slate-500 text-slate-50"
                  : "bg-slate-50 text-slate-500"
              } label-radio border border-slate-500`}
            >
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"null"}
                onChange={(e) => setEstado(null as FilterType["estado"])}
              />
            </label>
          </div>
        </section>

        {/* ----------------------------------------------- */}
        <section title="<<QUIEN>>" className="py-8 border-b border-b-slate-200">
          <h3 className="mb-4 text-lg font-semibold ">
            De :{" "}
            <small className="text-slate-500">
              {quien ? quien : "Los dos"}
            </small>
          </h3>
          <div className="flex items-center justify-between space-x-2">
            {/* //* ---- ABDEL RADIO */}
            <label
              className={`${
                quien === "Abdel"
                  ? "bg-blue-500 text-slate-50"
                  : "bg-slate-50 text-blue-500"
              } label-radio border border-blue-500`}
            >
              <MdComputer size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"Abdel"}
                onChange={(e) =>
                  setQuien(e.target.value as FilterType["quien"])
                }
              />
            </label>

            {/* //* ---- BELKYS RADIO */}
            <label
              className={`${
                quien === "Belkys"
                  ? "bg-pink-500 text-slate-50"
                  : "bg-slate-50 text-pink-500"
              } label-radio border border-pink-500`}
            >
              <MdLocalFlorist size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"Belkys"}
                onChange={(e) =>
                  setQuien(e.target.value as FilterType["quien"])
                }
              />
            </label>

            {/* //* ---- ALL RADIO */}
            <label
              className={`${
                quien === null
                  ? "bg-slate-500 text-slate-50"
                  : "bg-slate-50 text-slate-500"
              } label-radio border border-slate-500`}
            >
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"null"}
                onChange={(e) => setQuien(null as FilterType["quien"])}
              />
            </label>
          </div>
        </section>

        {/* ----------------------------------------------- */}
        <section title="<<DONDE>>" className="py-8 border-b border-b-slate-200">
          <h3 className="mb-4 text-lg font-semibold ">
            En :{" "}
            <small className="text-slate-500">
              {donde ? donde : "Los dos"}
            </small>
          </h3>
          <div className="flex items-center justify-between space-x-2">
            {/* //* ---- MARRUECOS RADIO */}
            <label
              className={`${
                donde === "MA"
                  ? "bg-red-500 text-slate-50"
                  : "bg-slate-50 text-red-500"
              } label-radio border border-red-500`}
            >
              <div className="grid w-6 h-6 place-items-center">
                <Flag
                  country="MA"
                  size={24}
                  className="border border-red-300"
                />
              </div>
              <input
                className="absolute invisible"
                type="radio"
                name="donde"
                value={"MA"}
                onChange={(e) =>
                  setDonde(e.target.value as FilterType["donde"])
                }
              />
            </label>

            {/* //* ---- ECUADOR RADIO */}
            <label
              className={`${
                donde === "EC"
                  ? "bg-yellow-400 text-slate-50"
                  : "bg-slate-50 text-yellow-400"
              } label-radio border border-yellow-400`}
            >
              <div className="grid w-6 h-6 place-items-center">
                <Flag
                  country="EC"
                  size={24}
                  className="border border-yellow-200"
                />
              </div>
              <input
                className="absolute invisible"
                type="radio"
                name="donde"
                value={"EC"}
                onChange={(e) =>
                  setDonde(e.target.value as FilterType["donde"])
                }
              />
            </label>

            {/* //* ---- ALL RADIO */}
            <label
              className={`${
                donde === null
                  ? "bg-slate-500 text-slate-50"
                  : "bg-slate-50 text-slate-500"
              } label-radio border border-slate-500`}
            >
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="donde"
                value={"null"}
                onChange={(e) => setDonde(null as FilterType["donde"])}
              />
            </label>
          </div>
        </section>

        {/* //* ---- SUBMIT BUTTON ---- */}
        <button
          type="submit"
          disabled={estado === null && quien === null && donde === null}
          className="w-full py-3 mt-12 font-semibold tracking-wider rounded shadow active:bg-slate-600 disabled:bg-gray-400 text-slate-50 bg-slate-800"
        >
          Filtrar
        </button>
      </div>
    </motion.form>
  );
}

export default FilterForm;
