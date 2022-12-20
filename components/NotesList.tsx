import { NoteType } from "../Types";
import { motion } from "framer-motion";
import NoteCard from "./NoteCard";

function NotesList({ notes }: { notes: NoteType[] }) {
  if (notes.length === 0) return null;
  return (
    <motion.section
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      className="grid grid-cols-1 gap-2 p-4 rounded-md bg-slate-50"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </motion.section>
  );
}

export default NotesList;
