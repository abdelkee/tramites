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

function SubNoteCard({ subNote }: { subNote: SubNoteType }) {
  const dispatch = useDispatch();

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
    dispatch({ type: "REVALIDATESUBNOTES" });
    toast.success("Vamos al seguiente!!");
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", subNote.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      dispatch({ type: "REVALIDATESUBNOTES" });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        {/* //* SUB NOTE DETAILS */}
        <motion.section
          layout
          drag={"x"}
          dragConstraints={{ right: 100, left: 0 }}
          className={`flex z-20 items-center justify-between relative w-full p-4 border-t border-t-blue-200 bg-slate-50 ${
            isChecked ? "line-through" : ""
          }`}
        >
          <p
            className={`w-3/4 select-all ${
              isChecked ? "text-slate-500" : "text-slate-800"
            }`}
          >
            {subNote.title}
          </p>

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
