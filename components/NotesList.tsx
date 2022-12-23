import { NoteType } from "../Types";
import NoteCard from "./NoteCard";
import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSelector } from "../context/useProvider";
import { useQuery } from "react-query";

const getNotes = async (section_id: string | undefined, who?: string) => {
  if (!section_id) return null;
  const { data: notes, error } = await supabase
    .from("todos")
    .select()
    .order("title")
    .eq("parent", section_id);
  if (error) throw new Error("error getting notes");
  if (!notes) return [];
  return notes as NoteType[];
};

function NotesList() {
  //* ---- QUERY
  const { selectedSection } = useSelector();
  const {
    data: notes,
    isLoading,
    isError,
    refetch,
  } = useQuery(["notes", selectedSection], () => getNotes(selectedSection?.id));
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  //* ---- JSX
  return (
    <section className="grid grid-cols-1 gap-5 p-4 rounded-md mt-8 mb-20 overflow-x-hidden">
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
}

export default NotesList;
