import { motion } from "framer-motion";
import {
  MdAccessTime,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
} from "react-icons/md";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useQueryClient } from "react-query";
import Flag from "react-flagkit";
import ctl from "@netlify/classnames-template-literals";
import { NoteType, SubNoteType } from "../Types";
import { supabase } from "../utils/supabaseClient";

type Props = {
  note: NoteType | SubNoteType;
  noteType: "default" | "sub";
};

export default function NoteCard({ note, noteType }: Props) {
  // ---- HOOKS
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(note.checked);
  const [loading, setLoading] = useState(false);

  // ---- FUNCTIONS
  const toggleNote = async () => {
    setIsChecked(!isChecked);
    const { error } = await supabase
      .from(noteType === "default" ? "todos" : "sub_todos")
      .update({ checked: !note.checked })
      .eq("id", note.id);
    if (error) return alert("Error updating the note!");
    queryClient.invalidateQueries(
      noteType === "default"
        ? ["notes"]
        : noteType === "sub"
        ? ["sub_notes"]
        : []
    );
    queryClient.invalidateQueries(["notesState"]);
  };

  const deleteNote = async () => {
    setLoading(true);
    if (confirm("Delete this note ?")) {
      const { error } = await supabase
        .from(noteType === "default" ? "todos" : "sub_todos")
        .delete()
        .eq("id", note.id);
      if (error) return alert("Error deleting the note!");
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries(
        noteType === "default"
          ? ["notes"]
          : noteType === "sub"
          ? ["sub_notes"]
          : []
      );
      queryClient.invalidateQueries(["notesState"]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // ---- STYLES
  const s = {
    container: ctl(`
      flex
      border
      bg-slate-50 
      overflow-hidden 
      z-20 
      items-center 
      justify-between 
      shadow
      relative 
      w-full
      py-4 
      pl-10
      pr-4 
      rounded-md
      ${
        isChecked &&
        `
        line-through 
        border
        shadow-none
      `
      }
    `),
    noteTitle: ctl(`
      select-text 
      w-3/4
      ${isChecked ? `text-slate-500` : `text-slate-800`}
    `),
    toggleButton: ctl(`
      grid 
      w-10 
      h-10 
      bg-white 
      rounded-full 
      place-items-center
      ${
        isChecked
          ? `
            text-green-600 
            border 
            border-green-300
          `
          : `
            text-orange-600 
            border 
            border-orage-100
          `
      }
    `),
    who: ctl(`
      absolute 
      -top-6 
      left-0 
      w-4 h-12
      rotate-45
      ${
        note.who === "Abdel"
          ? `bg-blue-400`
          : note.who === "Belkys"
          ? `bg-pink-400`
          : ""
      }
    `),
    where: ctl(`
      absolute 
      border 
      border-gray-100 
      left-1 
      bottom-1  
    `),
    deleteButton: ctl(`
      absolute 
      top-0 
      left-0 
      z-10 
      grid 
      w-24 
      h-full 
      p-4 
      bg-red-500 
      border 
      rounded-md 
      place-items-center 
      text-slate-50 
      active:focus:bg-red-600 
      disabled:bg-gray-500
    `),
  };

  // ---- JSX
  return (
    <>
      <div title="Wrapper" className={`relative w-full`}>
        <motion.section
          title="Container"
          drag={"x"}
          dragConstraints={{ right: 100, left: 0 }}
          className={s.container}
        >
          <p className={s.noteTitle}>{note.title}</p>

          <button
            title="Toggle button"
            onClick={toggleNote}
            className={s.toggleButton}
          >
            {isChecked ? (
              <MdCheckCircle size="24px" />
            ) : (
              <MdAccessTime size="24px" />
            )}
          </button>

          <div title="Who" className={s.who} />

          <div title="Where" className={s.where}>
            <Flag country={note.where} size={20} />
          </div>
        </motion.section>

        <button
          title="Delete button"
          className={s.deleteButton}
          onClick={deleteNote}
          disabled={loading}
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
