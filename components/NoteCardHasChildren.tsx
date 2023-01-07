import { motion } from "framer-motion";
import { useState } from "react";
import Flag from "react-flagkit";
import { MdOpenInBrowser } from "react-icons/md";
import ctl from "@netlify/classnames-template-literals";
import { NoteType } from "../Types";
import SubNotesList from "./SubNotesListModal";

function NoteCardHasChildren({ note }: { note: NoteType }) {
  // ---- HOOKS
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // ---- STYLES
  const s = {
    container: ctl(`
      flex 
      bg-slate-50 
      overflow-hidden 
      z-20 
      items-center 
      justify-between 
      shadow 
      relative 
      w-full 
      py-4 
      pl-6 
      pr-4 
      rounded-md
    `),
    noteTitle: ctl(`
      select-text 
      w-3/4
    `),
    openButton: ctl(`
      grid 
      w-10 
      h-10 
      bg-transparent 
      rounded-full 
      place-items-center 
      text-slate-700
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
  };
  return (
    <>
      <div className={`relative`}>
        <motion.section title="Container" className={s.container}>
          <p className={s.noteTitle}>
            {note.title} {" 0"}
          </p>

          <button
            title="Open button"
            onClick={() => setIsNoteOpen(!isNoteOpen)}
            className={s.openButton}
          >
            <MdOpenInBrowser size="24px" />
          </button>

          <div title="Who" className={s.who} />

          <div title="Where" className={s.where}>
            <Flag country={note.where} size={20} />
          </div>
        </motion.section>

        {/* //* ---- sub notes modal */}
        {isNoteOpen && (
          <SubNotesList parentNote={note} setIsNoteOpen={setIsNoteOpen} />
        )}
      </div>
    </>
  );
}

export default NoteCardHasChildren;
