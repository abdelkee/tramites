import { NoteType } from "../Types";
import NoteCard from "./NoteCard";

function NotesList({ notes }: { notes: NoteType[] }) {
  return (
    <main className="grid grid-cols-1 gap-4 p-4 mb-16 mt-28">
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </main>
  );
}

export default NotesList;
