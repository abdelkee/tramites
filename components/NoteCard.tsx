import { AnimatePresence, motion } from "framer-motion";
import {
  MdAccessTime,
  MdArrowCircleDown,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
  MdArrowCircleUp,
} from "react-icons/md";
import { NoteType } from "../Types";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import SubNotesList from "./SubNotesList";
import { useDispatch } from "../context/useProvider";

function NoteCard({ note }: { note: NoteType }) {
  const dispatch = useDispatch();

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
    dispatch({ type: "REVALIDATENOTES" });
    toast.success("Vamos al seguiente!!");
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase.from("todos").delete().eq("id", note.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      dispatch({ type: "REVALIDATENOTES" });
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
          className={`flex z-20 items-center justify-between relative w-full p-4 rounded-md ${
            isChecked ? "line-through" : ""
          } ${
            isNoteOpen ? "border border-yellow-500 bg-slate-500" : "bg-slate-50"
          }`}
        >
          <p
            className={`w-3/4 select-text ${
              isChecked ? "text-slate-500" : "text-slate-800"
            } ${isNoteOpen ? "text-slate-50" : ""}`}
          >
            {note.title}
          </p>
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
          )}
        </motion.section>

        {/* //* DELETE BUTTON */}
        {!note.has_children && (
          <button
            className="absolute top-0 left-0 z-10 grid w-24 h-full p-4 bg-red-500 border rounded-md place-items-center text-slate-50 active:focus:bg-red-600"
            onClick={deleteNote}
          >
            {!loading ? (
              <MdDelete size="24px" />
            ) : (
              <MdAutorenew size={"24px"} className="animate-spin" />
            )}
          </button>
        )}

        {/* //* ---- card body */}
        <AnimatePresence>
          {isNoteOpen && <SubNotesList parentNote={note} />}
        </AnimatePresence>
      </div>
    </>
  );
}

export default NoteCard;
