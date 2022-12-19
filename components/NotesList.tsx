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
      className="p-4 grid grid-cols-1 gap-2 bg-slate-50 rounded-md"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </motion.section>
    // <main className="grid grid-cols-1 gap-4 p-4 mb-16 mt-28 overflow-x-hidden">
    //   {notes?.map((note) => (
    //     <NoteCard key={note.id} note={note} />
    //   ))}
    // </main>
  );
}

export default NotesList;
