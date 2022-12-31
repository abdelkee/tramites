import { motion } from "framer-motion";
import {
  MdAccessTime,
  MdArrowCircleDown,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
  MdArrowCircleUp,
  MdAdd,
} from "react-icons/md";
import { NoteType } from "../Types";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import SubNotesList from "./SubNotesList";
import { useDispatch } from "../context/useProvider";
import { useQueryClient } from "react-query";
import Flag from "react-flagkit";

function NoteCard({ note }: { note: NoteType }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //* ---- STATES
  const [isChecked, setIsChecked] = useState(note.checked);
  const [loading, setLoading] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  //* ---- FUNCTIONS
  const toggleNote = async () => {
    setIsChecked(!isChecked);
    const { error } = await supabase
      .from("todos")
      .update({ checked: !note.checked })
      .eq("id", note.id);
    if (error) return alert("Error updating the note!");
    queryClient.invalidateQueries(["notes"]);
    queryClient.invalidateQueries(["notesState"]);
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase.from("todos").delete().eq("id", note.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries(["notes"]);
      queryClient.invalidateQueries(["notesState"]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`relative ${isNoteOpen && "shadow-md"}`}>
        {/* //* NOTE DETAILS */}
        <motion.section
          drag={!note.has_children && "x"}
          dragConstraints={{ right: 100, left: 0 }}
          className={`flex overflow-hidden z-20 items-center justify-between shadow relative w-full py-4 pl-6 pr-4 rounded-md ${
            isChecked ? "line-through border shadow-none" : ""
          } ${
            isNoteOpen ? "border border-slate-600 bg-slate-500" : "bg-slate-50"
          }`}
        >
          <div className="flex items-center w-3/4 space-x-3">
            <p
              className={`select-text ${
                isChecked ? "text-slate-500" : "text-slate-800"
              } ${isNoteOpen ? "text-slate-50" : ""}`}
            >
              {note.title}
            </p>
            {note.has_children && (
              <p
                className={`font-semibold ${isNoteOpen ? "text-slate-50" : ""}`}
              >
                0
              </p>
            )}
          </div>

          {/* //* ---- TOGGLE BUTTON SECTION */}
          {!note.has_children ? (
            <button
              onClick={toggleNote}
              className={`grid w-10 h-10 bg-white rounded-full place-items-center  ${
                isChecked
                  ? "text-green-600 border border-green-300"
                  : "text-orange-600 border border-orage-100"
              }`}
            >
              {isChecked ? (
                <MdCheckCircle size="24px" />
              ) : (
                <MdAccessTime size="24px" />
              )}
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              {/* //* ---- ADD SUB NOTE BUTTON */}
              {isNoteOpen && (
                <button
                  className="text-slate-50"
                  onClick={() => {
                    dispatch({ type: "SET_MEMBER", payload: "subNote" });
                    dispatch({ type: "SET_SELECTED_NOTE", payload: note });
                    dispatch({ type: "SET_MODAL_SHOW", payload: true });
                  }}
                >
                  <MdAdd size="24px" />
                </button>
              )}

              {/* //* ---- OPEN NOTE BUTTON */}
              <button
                onClick={() => setIsNoteOpen(!isNoteOpen)}
                className={`grid w-10 h-10 bg-transparent ${
                  isNoteOpen ? "text-slate-50" : "text-slate-600"
                } rounded-full place-items-center`}
              >
                {!isNoteOpen ? (
                  <MdArrowCircleDown size="24px" />
                ) : (
                  <MdArrowCircleUp size="24px" />
                )}
              </button>
            </div>
          )}

          {/* //* ---- WHO SECTION */}
          <section
            className={`absolute -top-6 left-0 w-4 h-12 ${
              note.who === "Abdel"
                ? "bg-blue-400"
                : note.who === "Belkys"
                ? "bg-pink-400"
                : ""
            } rotate-45`}
          />

          {/* //* ---- WHERE SECTION */}
          <section className="absolute border border-gray-100 left-1 bottom-1">
            <Flag country={note.where} size={20} />
          </section>
        </motion.section>

        {/* //* DELETE BUTTON */}
        {!note.has_children && (
          <button
            className="absolute top-0 left-0 z-10 grid w-24 h-full p-4 bg-red-500 border rounded-md place-items-center text-slate-50 active:focus:bg-red-600 disabled:bg-gray-500"
            onClick={deleteNote}
            disabled={loading}
          >
            {!loading ? (
              <MdDelete size="24px" />
            ) : (
              <MdAutorenew size={"24px"} className="animate-spin" />
            )}
          </button>
        )}

        {/* //* ---- card body */}
        {isNoteOpen && <SubNotesList parentNote={note} />}
      </div>
    </>
  );
}

export default NoteCard;
