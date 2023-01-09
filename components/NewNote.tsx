import { useState } from "react";
import { MdAdd, MdNorth } from "react-icons/md";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useQueryClient } from "react-query";
import Flag from "react-flagkit";
import ctl from "@netlify/classnames-template-literals";
import { useDispatch, useSelector } from "../context/useProvider";
import { supabase } from "../utils/supabaseClient";

export default function NewNote() {
  // ---- HOOKS
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [loading, setLoading] = useState(false);
  const { member, selectedSection, selectedNote } = useSelector();
  const [donde, setDonde] = useState<string>("MA");
  const [quien, setQuien] = useState<string>("Abdel");

  // ---- FUNCTIONS
  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title) return;
      const capTitle = title.charAt(0).toUpperCase() + title.slice(1);
      const { error } = await supabase.from("todos").insert([
        {
          title: capTitle,
          parent: selectedSection?.id,
          has_children: hasChildren,
          who: quien,
          where: donde,
        },
      ]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SET_MODAL_SHOW", payload: false });
      queryClient.invalidateQueries(["notes"]);
      queryClient.invalidateQueries(["notesState"]);
      document.body.style.overflow = "auto";
    }
  };

  const addSubNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title) return;
      const capTitle = title.charAt(0).toUpperCase() + title.slice(1);
      const { error } = await supabase.from("sub_todos").insert([
        {
          title: capTitle,
          parent: selectedNote?.id,
          who: quien,
          where: donde,
        },
      ]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SET_MODAL_SHOW", payload: false });
      queryClient.invalidateQueries(["sub_notes"]);
      queryClient.invalidateQueries(["notesState"]);
      document.body.style.overflow = "auto";
    }
  };

  const addSection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title) return;
      const capTitle = title.charAt(0).toUpperCase() + title.slice(1);
      const { error } = await supabase
        .from("sections")
        .insert([{ title: capTitle }]);
      if (error) return alert("Error creating the section!");
      toast.success("Section added successfully!");
    } catch (error) {
      return alert("Error creating the section!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SET_MODAL_SHOW", payload: false });
      queryClient.invalidateQueries("sections");
      document.body.style.overflow = "auto";
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCheckboxChange = () => {
    setHasChildren((curr) => !curr);
  };

  const handleQuienChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuien(e.target.value);
  };

  const handleDondeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonde(e.target.value);
  };

  // ---- STYLES
  const s = {
    container: ctl(`
      fixed 
      z-50 
      flex 
      flex-col 
      w-10/12 
      space-y-3 
      -translate-x-1/2 
      top-20 
      left-1/2
    `),
    label: ctl(`
      w-full 
      mb-8 
      text-xl 
      font-semibold 
      tracking-wider 
      text-center 
      text-white
    `),
    titleInputContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-2
    `),
    titleInput: ctl(`
      flex-1 
      p-4 
      rounded 
      focus:outline-none 
      focus:border-2 
      ${
        member === "section"
          ? `focus:border-blue-400`
          : member === "note"
          ? `focus:border-orange-400`
          : member === "subNote"
          ? `focus:border-cyan-400`
          : ""
      }
    `),
    submitButton: ctl(`
    grid 
    p-4 
    text-white 
    rounded
    border-2 
    place-items-center 
    disabled:border-gray-400
    ${
      member === "section"
        ? `bg-blue-600 border-blue-500 disabled:bg-gray-400`
        : member === "note"
        ? `bg-orange-600 border-orange-500 disabled:bg-gray-400`
        : member === "subNote"
        ? `bg-cyan-600 border-cyan-500 disabled:bg-gray-400`
        : ""
    }
    `),
    optionsContainer: ctl(`
      w-full 
      py-4 
      pr-12 
      space-y-4
    `),
    hasChildrenContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-4
    `),
    hasChildrenCheckbox: ctl(`
      w-6 
      h-6 
      accent-orange-600
    `),
    eachOptionContainer: ctl(`
      flex 
      items-center 
      justify-between 
      space-x-4
    `),
    moroccoRadioLabel: ctl(`
    ${donde === "MA" && `border-2 border-white`}
    `),
    ecuadorRadioLabel: ctl(`
    ${donde === "EC" && `border-2 border-white`}
    `),
    abdelRadio: ctl(`
      w-6 
      h-6 
      accent-blue-500
    `),
    belkysRadio: ctl(`
      w-6 
      h-6 
      accent-pink-500
    `),
    moroccoRadioInput: ctl(`
      absolute 
      invisible 
      w-6 
      h-6 
      accent-red-600
    `),
    ecuadorRadioInput: ctl(`
      absolute 
      invisible 
      w-6 
      h-6 
      accent-yellow-600
    `),
  };

  // ---- JSX
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={s.container}
      onSubmit={
        member === "section"
          ? addSection
          : member === "note"
          ? addNote
          : addSubNote
      }
    >
      <label className={s.label}>
        {member === "section"
          ? "Nueva seccion"
          : member === "note"
          ? "Nuevo tramite para " + selectedSection?.title
          : member === "subNote"
          ? "Nuevo sub tramite en " + selectedNote?.title
          : ""}
      </label>

      <section className={s.titleInputContainer} title="Title input section">
        <input
          type="text"
          placeholder={
            member === "section"
              ? "Titulo de la seccion ..."
              : member === "note"
              ? "Titulo del tramite ..."
              : member === "subNote"
              ? "Titulo del sub tramite ..."
              : ""
          }
          className={s.titleInput}
          autoFocus
          onChange={handleTitleChange}
        />

        <button
          title="Submit button"
          type="submit"
          disabled={!title || loading}
          className={s.submitButton}
        >
          {!loading ? <MdAdd size="24px" /> : <MdNorth size="24px" />}
        </button>
      </section>

      {member !== "section" && (
        <section title="Options section" className={s.optionsContainer}>
          {member === "note" && (
            <div title="Has children" className={s.hasChildrenContainer}>
              <p className="text-white">El tramite tiene sub tramites ?</p>
              <input
                type="checkbox"
                name="hasChildren"
                id="grandChild"
                className={s.hasChildrenCheckbox}
                checked={hasChildren}
                onChange={handleCheckboxChange}
              />
            </div>
          )}

          <div title="Who" className={s.eachOptionContainer}>
            <p className="text-white">De quien es el tramite ?</p>
            <div className={s.eachOptionContainer}>
              <input
                type="radio"
                name="who"
                id="abdel"
                value="Abdel"
                checked={quien === "Abdel"}
                className={s.abdelRadio}
                onChange={handleQuienChange}
              />
              <input
                type="radio"
                name="who"
                id="belkys"
                value="Belkys"
                className={s.belkysRadio}
                onChange={handleQuienChange}
              />
            </div>
          </div>

          <div title="Where" className={s.eachOptionContainer}>
            <p className="text-white">Donde es el tramite ?</p>
            <div className={s.eachOptionContainer}>
              <label className={s.moroccoRadioLabel}>
                <Flag country={"MA"} />
                <input
                  type="radio"
                  name="where"
                  value="MA"
                  id="MA"
                  className={s.moroccoRadioInput}
                  onChange={handleDondeChange}
                />
              </label>
              <label className={s.ecuadorRadioLabel}>
                <Flag country={"EC"} />
                <input
                  type="radio"
                  name="where"
                  value="EC"
                  id="EC"
                  className={s.ecuadorRadioInput}
                  onChange={handleDondeChange}
                />
              </label>
            </div>
          </div>
        </section>
      )}
    </motion.form>
  );
}
