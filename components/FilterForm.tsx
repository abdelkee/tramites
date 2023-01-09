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
import ctl from "@netlify/classnames-template-literals";
import { useDispatch } from "../context/useProvider";
import { FilterType } from "../Types";

export default function FilterForm() {
  // ---- HOOKS
  const dispatch = useDispatch();
  const [estado, setEstado] = useState<FilterType["estado"]>(null);
  const [quien, setQuien] = useState<FilterType["quien"]>(null);
  const [donde, setDonde] = useState<FilterType["donde"]>(null);

  // ---- FUNCTIONS
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
  const handleEstadoChange = (val: boolean | null) => {
    setEstado(val as FilterType["estado"]);
  };
  const handleQuienChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuien(e.target.value as FilterType["quien"]);
  };
  const handleDondeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonde(e.target.value as FilterType["donde"]);
  };

  // ---- STYLES
  const s = {
    container: ctl(`
      fixed 
      z-50 
      flex 
      flex-col 
      top-0 
      left-0 
      w-3/4 
      bg-slate-50 
      h-screen 
      shadow-lg 
    `),
    header: ctl(`
      grid 
      w-full 
      text-xl 
      font-semibold 
      tracking-wider 
      h-28 
      bg-gradient-to-br
      from-slate-700
      to-slate-500
      place-items-center 
      text-slate-50
    `),
    bodyContainer: ctl(`
      flex 
      flex-col 
      justify-between 
      p-4
    `),
    estadoSection: ctl(`
      py-8 
      border-b 
      border-b-slate-200
    `),
    estadoHeading: ctl(`
      mb-4 
      text-lg 
      font-semibold
    `),
    estadoRadioContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-2
    `),
    estadoPendingLabel: ctl(`
      label-radio 
      border 
      border-orange-500
      ${
        estado === false
          ? "bg-orange-500 text-slate-50"
          : "bg-slate-50 text-orange-500"
      }
    `),
    estadoCompletedLabel: ctl(`
      label-radio 
      border 
      border-green-500
      ${estado ? "bg-green-500 text-slate-50" : "bg-slate-50 text-green-500"}
    `),
    estadoTodoLabel: ctl(`
      label-radio 
      border 
      border-slate-500
      ${
        estado === null
          ? "bg-slate-500 text-slate-50"
          : "bg-slate-50 text-slate-500"
      }
    `),
    quienSection: ctl(`
      py-8 
      border-b 
      border-b-slate-200
    `),
    quienHeading: ctl(`
      mb-4 
      text-lg 
      font-semibold
    `),
    quienRadioContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-2
    `),
    quienAbdelLabel: ctl(`
      label-radio 
      border 
      border-blue-500
      ${
        quien === "Abdel"
          ? "bg-blue-500 text-slate-50"
          : "bg-slate-50 text-blue-500"
      }
    `),
    quienBelkysLabel: ctl(`
      label-radio 
      border 
      border-pink-500
      ${
        quien === "Belkys"
          ? "bg-pink-500 text-slate-50"
          : "bg-slate-50 text-pink-500"
      } 
    `),
    quienLosDosLabel: ctl(`
      label-radio 
      border 
      border-slate-500
    ${
      quien === null
        ? "bg-slate-500 text-slate-50"
        : "bg-slate-50 text-slate-500"
    } 
    `),
    dondeSection: ctl(`
      py-8 
      border-b 
      border-b-slate-200
    `),
    dondeHeading: ctl(`
      mb-4 
      text-lg 
      font-semibold
    `),
    dondeRadioContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-2
    `),
    dondeMoroccoLabel: ctl(`
      label-radio 
      border 
      border-red-500
      ${
        donde === "MA" ? "bg-red-500 text-slate-50" : "bg-slate-50 text-red-500"
      } 
    `),
    flagContainer: ctl(`
      grid 
      w-6 
      h-6 
      place-items-center
    `),
    dondeEcuadorLabel: ctl(`
      label-radio 
      border 
      border-yellow-400
      ${
        donde === "EC"
          ? "bg-yellow-400 text-slate-50"
          : "bg-slate-50 text-yellow-400"
      } 
    `),
    dondeLosDosLabel: ctl(`
      label-radio 
      border 
      border-slate-500
      ${
        donde === null
          ? "bg-slate-500 text-slate-50"
          : "bg-slate-50 text-slate-500"
      } 
    `),
    submitButton: ctl(`
      w-full 
      py-3 
      mt-12 
      font-semibold 
      tracking-wider 
      rounded 
      shadow 
      active:bg-slate-600 
      disabled:bg-gray-400 
      text-slate-50 
      bg-slate-800
    `),
  };

  // ---- JSX
  return (
    <motion.form
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1, easings: ["easeInOut"] }}
      onSubmit={submitFilterValues}
      className={s.container}
    >
      <header className={s.header}>Filtrar tramites</header>

      <div className={s.bodyContainer}>
        <section title="ESTADO" className={s.estadoSection}>
          <h3 className={s.estadoHeading}>
            Estado :{" "}
            <small className="text-slate-500">
              {estado === true
                ? "Completados"
                : estado === false
                ? "Pendientes"
                : "Todo"}
            </small>
          </h3>
          <div title="RADIOS CONTAINER" className={s.estadoRadioContainer}>
            <label title="PENDING RADIO" className={s.estadoPendingLabel}>
              <MdAccessTime size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"false"}
                onChange={() => handleEstadoChange(false)}
              />
            </label>

            <label title="COMPLETED RADIO" className={s.estadoCompletedLabel}>
              <MdDone size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"true"}
                onChange={() => handleEstadoChange(true)}
              />
            </label>

            <label title="ALL RADIO" className={s.estadoTodoLabel}>
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="estado"
                value={"null"}
                onChange={() => handleEstadoChange(null)}
              />
            </label>
          </div>
        </section>

        <section title="QUIEN" className={s.quienSection}>
          <h3 className={s.quienHeading}>
            De :{" "}
            <small className="text-slate-500">
              {quien ? quien : "Los dos"}
            </small>
          </h3>
          <div title="RADIOS CONTAINER" className={s.quienRadioContainer}>
            <label title="ABDEL RADIO" className={s.quienAbdelLabel}>
              <MdComputer size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"Abdel"}
                onChange={handleQuienChange}
              />
            </label>

            <label title="BELKYS RADIO" className={s.quienBelkysLabel}>
              <MdLocalFlorist size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"Belkys"}
                onChange={handleQuienChange}
              />
            </label>

            <label title="LOS DOS" className={s.quienLosDosLabel}>
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="quien"
                value={"null"}
                onChange={() => setQuien(null as FilterType["quien"])}
              />
            </label>
          </div>
        </section>

        <section title="DONDE" className={s.dondeSection}>
          <h3 className={s.dondeHeading}>
            En :{" "}
            <small className="text-slate-500">
              {donde ? donde : "Los dos"}
            </small>
          </h3>
          <div title="RADIOS CONTAINER" className={s.dondeRadioContainer}>
            <label title="MARRUECOS RADIO" className={s.dondeMoroccoLabel}>
              <div title="Flag" className={s.flagContainer}>
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
                onChange={handleDondeChange}
              />
            </label>

            <label title="ECUADOR RADIO" className={s.dondeEcuadorLabel}>
              <div className={s.flagContainer}>
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
                onChange={handleDondeChange}
              />
            </label>

            <label title="LOS DOS" className={s.dondeLosDosLabel}>
              <MdClearAll size="24px" />
              <input
                className="absolute invisible"
                type="radio"
                name="donde"
                value={"null"}
                onChange={() => setDonde(null as FilterType["donde"])}
              />
            </label>
          </div>
        </section>

        <button
          title="SUBMIT BUTTON"
          type="submit"
          disabled={estado === null && quien === null && donde === null}
          className={s.submitButton}
        >
          Filtrar
        </button>
      </div>
    </motion.form>
  );
}
