import { NoteType } from "../Types";
import NoteCard from "./NoteCard";
import { supabase } from "../utils/supabaseClient";
import { useSelector } from "../context/useProvider";
import { useQuery } from "react-query";

const getNotes = async (id: string | undefined) => {
  if (!id) return null;
  const { data: notes, error } = await supabase
    .from("todos")
    .select()
    .eq("parent", id);
  if (error) throw new Error("error getting notes");
  if (!notes) return [];
  return notes as NoteType[];
};

function NotesList() {
  //* ---- QUERY
  const { selectedSection, revalidateNotes } = useSelector();
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery(["notes", selectedSection, revalidateNotes], () =>
    getNotes(selectedSection?.id)
  );
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  //* ---- JSX
  return (
    <section className="grid grid-cols-1 gap-2 p-4 rounded-md  mt-8 mb-20">
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
}

export default NotesList;
