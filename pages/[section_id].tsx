import NotesList from "../components/NotesList";
import { NoteType } from "../Types";
import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  const { data: notes, error } = await supabase
    .from("todos")
    .select("*")
    .order("title");
  if (error) throw new Error(error.message);

  const completedNotes = notes.filter((note) => note.checked).length;
  const pendingNotes = notes.filter((note) => !note.checked).length;
  return {
    props: {
      notes,
      completedNotes,
      pendingNotes,
    },
  };
}

function SectionPage({ notes }: { notes: NoteType[] }) {
  return <NotesList notes={notes} />;
}

export default SectionPage;
