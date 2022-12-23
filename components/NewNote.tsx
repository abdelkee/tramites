import { useState } from "react";
import { MdAdd, MdNorth } from "react-icons/md";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";
import { useQueryClient } from "react-query";
import Flag from "react-flagkit";

function NewNote() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  //* ---- STATES
  const [title, setTitle] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [loading, setLoading] = useState(false);
  const { member, selectedSection, selectedNote } = useSelector();
  const [donde, setDonde] = useState<string>("MA");
  const [quien, setQuien] = useState<string>("Abdel");

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
      className="fixed z-50 flex flex-col space-y-3 w-10/12 -translate-x-1/2 top-20 left-1/2"
      onSubmit={
        member === "section"
          ? addSection
          : member === "note"
          ? addNote
          : addSubNote
      }
    >
      <label className="w-full mb-8 text-xl font-semibold tracking-wider text-center text-white">
        {member === "section"
          ? "Nueva seccion"
          : member === "note"
          ? "Nuevo tramite para " + selectedSection?.title
          : member === "subNote"
          ? "Nuevo sub tramite en " + selectedNote?.title
          : ""}
      </label>

      <section className="flex items-center justify-between space-x-2">
        {/* //* ---- INPUT FIELD */}
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
          disabled={!title || loading}
          className={`grid p-4 text-white rounded ${
            member === "section"
              ? "bg-blue-600 border-blue-500 disabled:bg-gray-400"
              : member === "note"
              ? "bg-orange-600 border-orange-500 disabled:bg-gray-400"
              : member === "subNote"
              ? "bg-cyan-600 border-cyan-500 disabled:bg-gray-400"
              : ""
          } border-2 place-items-center disabled:border-gray-400`}
        >
          {!loading ? <MdAdd size="24px" /> : <MdNorth size="24px" />}
        </button>
      </section>

      {/* //* ---- RADIO SECTION */}

      {member !== "section" && (
        <section className="w-full py-4 space-y-4 pr-12 ">
          {/* //* ---- HAS CHILDREN ---- */}
          {member === "note" && (
            <div className="flex space-x-4 items-center justify-between">
              <p className="text-white">El tramite tiene sub tramites ?</p>
              <input
                type="checkbox"
                name="hasChildren"
                id="grandChild"
                className="accent-orange-600 w-6 h-6"
                checked={hasChildren}
                onChange={() => setHasChildren(!hasChildren)}
              />
            </div>
          )}

          {/* //* ---- WHO ---- */}
          <div className="flex space-x-4 items-center justify-between">
            <p className="text-white">De quien es el tramite ?</p>
            <div className="flex items-center justify-between space-x-4">
              <input
                type="radio"
                name="who"
                id="abdel"
                value="Abdel"
                checked={quien === "Abdel"}
                className="accent-blue-500 w-6 h-6"
                onChange={(e) => setQuien(e.target.value)}
              />
              <input
                type="radio"
                name="who"
                id="belkys"
                value="Belkys"
                className="accent-pink-500 w-6 h-6"
                onChange={(e) => setQuien(e.target.value)}
              />
            </div>
          </div>

          {/* //* ---- WHERE ---- */}
          <div className="flex space-x-4 items-center justify-between">
            <p className="text-white">Donde es el tramite ?</p>
            <div className="flex items-center justify-between space-x-4">
              <label className={`${donde === "MA" && "border-2 border-white"}`}>
                <Flag country={"MA"} />
                <input
                  type="radio"
                  name="where"
                  value="MA"
                  id="MA"
                  className="accent-red-600 w-6 h-6 absolute invisible"
                  onChange={(e) => setDonde(e.target.value)}
                />
              </label>
              <label className={`${donde === "EC" && "border-2 border-white"}`}>
                <Flag country={"EC"} />
                <input
                  type="radio"
                  name="where"
                  value="EC"
                  id="EC"
                  className="accent-yellow-600 w-6 h-6 absolute invisible"
                  onChange={(e) => setDonde(e.target.value)}
                />
              </label>
            </div>
          </div>
        </section>
      )}
    </motion.form>
  );
}

export default NewNote;
