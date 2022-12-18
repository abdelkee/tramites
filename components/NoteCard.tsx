import { motion } from "framer-motion";
import {
  MdAccessTime,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
} from "react-icons/md";
import { NoteType } from "../Types";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function NoteCard({ note }: { note: NoteType }) {
  const router = useRouter();

  //* ---- STATES
  const [isChecked, setIsChecked] = useState(note.checked);
  const [loading, setLoading] = useState(false);
  //* ---- FUNCTIONS
  const toggleNote = async () => {
    setIsChecked(!isChecked);
    const { error } = await supabase
      .from("todos")
      .update({ checked: !note.checked })
      .eq("id", note.id);
    if (error) return alert("Error updating the note!");
    router.replace("/");
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase.from("todos").delete().eq("id", note.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      router.replace("/");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <motion.section
          drag={"x"}
          dragConstraints={{ right: 100, left: 0 }}
          className={`flex z-20 items-center justify-between relative w-full p-4 bg-white border rounded-lg ${
            isChecked
              ? "shadow-none border-slate-400"
              : "shadow-md border-slate-300 shadow-orange-600/10"
          }`}
        >
          <p
            className={`w-3/4 ${
              isChecked ? "text-slate-400" : "text-slate-800"
            }`}
          >
            {note.title}
          </p>
          <button
            onClick={toggleNote}
            className={`grid w-10 h-10 ${
              isChecked
                ? "text-green-600 shadow-none border border-green-200"
                : "text-orange-600 shadow-md border border-slate-50 animate-pulse"
            } bg-white rounded-full place-items-center`}
          >
            {isChecked ? (
              <MdCheckCircle size="24px" />
            ) : (
              <MdAccessTime size="24px" />
            )}
          </button>
        </motion.section>

        {/* //* delete button */}
        <button
          className="p-4 border z-10 w-24 absolute left-0 top-0 h-full rounded-lg bg-red-500 grid place-items-center text-slate-50 active:focus:bg-red-600"
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

export default NoteCard;
