import { motion } from "framer-motion";
import { MdAccessTime, MdCheckCircle } from "react-icons/md";
import { NoteType } from "../Types";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function NoteCard({ note }: { note: NoteType }) {
  const router = useRouter();

  //* ---- FUNCTIONS
  const toggleNote = async () => {
    const { error } = await supabase
      .from("todos")
      .update({ checked: !note.checked })
      .eq("id", note.id);
    if (error) return alert("Error updating the note!");
    router.replace("/");
  };
  return (
    <>
      <motion.div
        className="flex items-center justify-between w-full p-4 bg-white border rounded-lg shadow-md border-slate-300"
        drag="x"
        dragSnapToOrigin
        onDrag={async () => {
          if (confirm("Delete this note ?")) {
            const { error } = await supabase
              .from("todos")
              .delete()
              .eq("id", note.id);
            if (error) return alert("Error deleting the note!");
            toast.success("Note deleted successfully!");
            router.replace("/");
          }
        }}
      >
        <p className="w-3/4 text-slate-900 ">{note.title}</p>
        <button
          onClick={toggleNote}
          className={`grid w-10 h-10 ${
            note.checked
              ? "text-green-600 shadow-none border border-green-200"
              : "text-orange-600 shadow-md border border-slate-50"
          } bg-white rounded-full place-items-center`}
        >
          {note.checked ? (
            <MdCheckCircle size="24px" />
          ) : (
            <MdAccessTime size="24px" />
          )}
        </button>
      </motion.div>
    </>
  );
}

export default NoteCard;
