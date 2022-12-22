import { NoteType, SubNoteType } from "../Types";
import { AnimatePresence, motion } from "framer-motion";
import SubNoteCard from "./SubNoteCard";
import { supabase } from "../utils/supabaseClient";
import { useQuery } from "react-query";
import { useSelector } from "../context/useProvider";

const getSubNotes = async (id: string | undefined) => {
  if (!id) return null;
  const { data: subNotes, error } = await supabase
    .from("sub_todos")
    .select()
    .eq("parent", id);
  if (error) throw new Error("error getting sub notes");
  if (!subNotes) return [];
  return subNotes as SubNoteType[];
};

function SubNotesList({ parentNote }: { parentNote: NoteType }) {
  const { revalidateSubNotes } = useSelector();
  console.log("here is sub notes");
  //* ---- QUERY
  const {
    data: subNotes,
    isLoading,
    isError,
  } = useQuery(["sub_notes", revalidateSubNotes], () =>
    getSubNotes(parentNote?.id)
  );
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  //* ---- JSX
  return (
    <motion.section
      // initial={{ height: 0 }}
      // animate={{ height: "auto" }}
      // exit={{ height: 0 }}
      layout
      className="grid grid-cols-1 gap-2 p-4 rounded-md bg-slate-50 mt-1 border border-yellow-500"
    >
      {subNotes?.map((subNote) => (
        <SubNoteCard key={subNote.id} subNote={subNote} />
      ))}
    </motion.section>
  );
}

export default SubNotesList;
