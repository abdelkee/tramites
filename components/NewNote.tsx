import { useState } from "react";
import { MdAdd, MdNorth } from "react-icons/md";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";
import { useQueryClient } from "react-query";

function NewNote() {
  const queryClient = useQueryClient();
  //* ---- STATES
  const [title, setTitle] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [loading, setLoading] = useState(false);
  const { member, selectedSection, selectedNote } = useSelector();
  const dispatch = useDispatch();

  //* ---- FUNCTIONS
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
        },
      ]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SETMODALSHOW", payload: false });
      queryClient.invalidateQueries("notes");
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
        },
      ]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      dispatch({ type: "SETMODALSHOW", payload: false });
      queryClient.invalidateQueries("sub_notes");
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
      onSubmit={
        member === "section"
          ? addSection
          : member === "note"
          ? addNote
          : addSubNote
      }
    >
      <label className="absolute w-full text-xl font-semibold tracking-wider text-center text-white -translate-x-1/2 left-1/2 -top-24">
        {member === "section"
          ? "Nueva familia"
          : member === "note"
          ? "Nuevo miembro de familia " + selectedSection?.title
          : member === "subNote"
          ? "Nuevo hijo de " + selectedNote?.title
          : ""}
      </label>

      {/* //* ---- INPUT FIELD */}
      <input
        type="text"
        placeholder={
          member === "section"
            ? "Apellido ..."
            : member === "note"
            ? "Nombre del miembro ..."
            : member === "subNote"
            ? "Nombre del hijo ..."
            : ""
        }
        className={`flex-1 p-4 rounded focus:outline-none focus:border-2 ${
          member === "section"
            ? "focus:border-blue-400"
            : member === "note"
            ? "focus:border-orange-400"
            : member === "subNote"
            ? "focus:border-cyan-400"
            : ""
        }`}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* //* ---- SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={!title}
        className={`grid p-4 text-white rounded ${
          member === "section"
            ? "bg-blue-600 border-blue-500 disabled:bg-gray-400"
            : member === "note"
            ? "bg-orange-600 border-orange-500 disabled:bg-gray-400"
            : member === "subNote"
            ? "bg-cyan-600 border-cyan-500 disabled:bg-gray-400"
            : ""
        } border-2 place-items-center disabled:border-none`}
      >
        {!loading ? <MdAdd size="24px" /> : <MdNorth size="24px" />}
      </button>

      {/* //* ---- GRANDCHILD SECTION */}
      {member === "note" && (
        <div className="absolute -bottom-16 left-0 flex space-x-4 items-center w-full py-4 pr-4">
          <p className="text-white">Este hijo tiene hijos ?</p>
          <input
            type="checkbox"
            name="hasChildren"
            id="grandChild"
            className="accent-pink-600 w-6 h-6"
            checked={hasChildren}
            onChange={() => setHasChildren(!hasChildren)}
          />
        </div>
      )}
    </motion.form>
  );
}

export default NewNote;
