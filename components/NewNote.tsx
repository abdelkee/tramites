import { useState } from "react";
import { MdAdd, MdNorth } from "react-icons/md";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";

function NewNote() {
  //* ---- STATES
  const [title, setTitle] = useState("");
  const [hasChild, setHasChild] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isSection, selectedSection } = useSelector();
  const dispatch = useDispatch();

  //* ---- FUNCTIONS
  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title) return;
      const capTitle = title.charAt(0).toUpperCase() + title.slice(1);
      const { error } = await supabase
        .from("todos")
        .insert([{ title: capTitle, section: selectedSection?.id }]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SETMODALSHOW", payload: false });
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
      dispatch({ type: "SETMODALSHOW", payload: false });
      document.body.style.overflow = "auto";
    }
  };

  //* ---- JSX
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed z-50 flex items-center justify-between w-10/12 space-x-2 -translate-x-1/2 top-40 left-1/2"
      onSubmit={isSection ? addSection : addNote}
    >
      <label className="absolute w-3/4 text-xl font-semibold tracking-wider text-center text-white -translate-x-1/2 left-1/2 -top-24">
        {isSection
          ? "Nueva familia"
          : "Nuevo hijo de la madre " + selectedSection?.title}
      </label>
      <input
        type="text"
        placeholder={
          isSection ? "Nombre de la madre ..." : "Nombre del hijo ..."
        }
        className={`flex-1 p-4 rounded focus:outline-none focus:ring ${
          isSection ? " focus:ring-slate-500" : "focus:ring-stone-500"
        }`}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        disabled={!title}
        className={`grid p-4 text-white rounded ${
          isSection
            ? "bg-slate-900 ring-slate-500 disabled:bg-slate-500"
            : "bg-stone-900 ring-stone-500 disabled:bg-stone-300"
        } ring place-items-center disabled:ring-0`}
      >
        {!loading ? <MdAdd size="24px" /> : <MdNorth size="24px" />}
      </button>

      {/* //* ---- GRANDCHILD SECTION */}
      {!isSection && (
        <div className="absolute -bottom-16 left-0 flex space-x-4 items-center w-full py-4 pr-4">
          <p className="text-white">Este hijo tiene hijos ?</p>
          <input
            type="checkbox"
            name="hasChild"
            id="grandChild"
            className="accent-pink-600 w-6 h-6"
            checked={hasChild}
            onChange={() => setHasChild(!hasChild)}
          />
        </div>
      )}
    </motion.form>
  );
}

export default NewNote;
