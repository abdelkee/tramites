import { motion } from "framer-motion";
import {
  MdAccessTime,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
} from "react-icons/md";
import { SubNoteType } from "../Types";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { useDispatch } from "../context/useProvider";
import Flag from "react-flagkit";
import { useQueryClient } from "react-query";

function SubNoteCard({ subNote }: { subNote: SubNoteType }) {
  const queryClient = useQueryClient();

  //* ---- STATES
  const [isChecked, setIsChecked] = useState(subNote.checked);
  const [loading, setLoading] = useState(false);

  //* ---- FUNCTIONS
  const toggleNote = async () => {
    setIsChecked(!isChecked);
    const { error } = await supabase
      .from("sub_todos")
      .update({ checked: !subNote.checked })
      .eq("id", subNote.id);
    if (error) return alert("Error updating the note!");
    queryClient.invalidateQueries(["sub_notes"]);
    queryClient.invalidateQueries(["notesState"]);
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase
        .from("sub_todos")
        .delete()
        .eq("id", subNote.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries(["sub_notes"]);
      queryClient.invalidateQueries(["notesState"]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full">
        {/* //* SUB NOTE DETAILS */}
        <motion.section
          drag={"x"}
          dragConstraints={{ right: 100, left: 0 }}
          className={`flex z-20 overflow-hidden rounded items-center justify-between relative w-full p-4 shadow-sm border border-gray-200 bg-slate-50 ${
            isChecked ? "line-through border shadow-none" : ""
          }`}
        >
          <p
            className={`w-3/4 select-all ${
              isChecked ? "text-slate-500" : "text-slate-800"
            }`}
          >
            {subNote.title}
          </p>

          {/* //* ---- TOGGLE BUTTON SECTION */}
          <button
            onClick={toggleNote}
            className={`grid w-10 h-10 ${
              isChecked
                ? "text-green-600 border border-green-300"
                : "text-orange-600 border border-orage-100"
            } bg-white rounded-full place-items-center`}
          >
            {isChecked ? (
              <MdCheckCircle size="24px" />
            ) : (
              <MdAccessTime size="24px" />
            )}
          </button>

          {/* //* ---- WHO SECTION */}
          <section
            className={`absolute -top-6 left-0 w-4 h-12 ${
              subNote.who === "Abdel"
                ? "bg-blue-400"
                : subNote.who === "Belkys"
                ? "bg-pink-400"
                : ""
            } rotate-45`}
          />

          {/* //* ---- WHERE SECTION */}
          <section className="absolute border border-gray-100 left-1 bottom-1">
            <Flag country={subNote.where} size={20} />
          </section>
        </motion.section>

        {/* //* DELETE BUTTON */}
        <button
          className="absolute top-0 left-0 z-10 grid w-24 h-full p-4 bg-red-500 border rounded-lg place-items-center text-slate-50 active:focus:bg-red-600"
          onClick={deleteNote}
        >
          {!loading ? (
            <MdDelete size="24px" />
          ) : (
            <MdAutorenew size={"24px"} className="animate-spin" />
          )}
        </button>
      </div>
    </>
  );
}

export default SubNoteCard;
