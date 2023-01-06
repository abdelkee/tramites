import { NoteType, SubNoteType } from "../Types";
import { AnimatePresence, motion } from "framer-motion";
import SubNoteCard from "./SubNoteCard";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "../context/useProvider";

const getSubNotes = async (id: string | undefined) => {
  if (!id) return null;
  const { data: subNotes, error } = await supabase
    .from("sub_todos")
    .select()
    .order("title")
    .eq("parent", id);
  if (error) throw new Error("error getting sub notes");
  if (!subNotes) return [];
  return subNotes as SubNoteType[];
};

function SubNotesList({
  parentNote,
  setIsNoteOpen,
}: {
  parentNote: NoteType;
  setIsNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //* ---- HOOKS
  const dispatch = useDispatch();

  //* ---- QUERY
  const {
    data: subNotes,
    isLoading,
    isError,
  } = useQuery("sub_notes", () => getSubNotes(parentNote?.id));
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  //* ---- JSX
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setIsNoteOpen(false)}
      />
      <motion.section
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 z-50 flex flex-col items-center w-full px-4 pt-16 pb-12 mt-1 space-y-4 border bg-gray-50 rounded-xl h-2/3 border-slate-200"
      >
        <p className="absolute top-0 w-full p-4 text-xl font-semibold tracking-wider text-center -translate-x-1/2 rounded text-slate-900 bg-gray-50 left-1/2">
          {parentNote.title}
        </p>
        {subNotes?.length === 0 ? (
          <p className="text-gray-500">No hay tramites aun!</p>
        ) : (
          subNotes?.map((subNote) => (
            <SubNoteCard key={subNote.id} subNote={subNote} />
          ))
        )}
      </motion.section>
    </>
  );
}

export default SubNotesList;
