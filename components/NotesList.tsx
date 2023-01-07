import { useQuery } from "react-query";
import ctl from "@netlify/classnames-template-literals";
import { FilterArrType, NoteType } from "../Types";
import NoteCard from "./NoteCard";
import { supabase } from "../utils/supabaseClient";
import { useSelector } from "../context/useProvider";
import NoteCardHasChildren from "./NoteCardHasChildren";

const getNotes = async (section_id: string | undefined) => {
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

const getFilteredNotes = async (
  section_id: string | undefined,
  filterOptions?: FilterArrType
) => {
  if (!section_id) return null;
  if (filterOptions) {
    const { data: notes, error } = await supabase
      .from("todos")
      .select()
      .order("title")
      .eq("parent", section_id)
      .in("checked", filterOptions.estado)
      .in("who", filterOptions.quien)
      .in("where", filterOptions.donde);
    if (error) throw new Error("error getting notes");
    if (!notes) return [];
    return notes as NoteType[];
  }
};

function NotesList() {
  // ---- HOOKS
  const { selectedSection, filterValues } = useSelector();
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery(["notes", selectedSection, filterValues], () => {
    if (filterValues) {
      return getFilteredNotes(selectedSection?.id, filterValues);
    } else {
      return getNotes(selectedSection?.id);
    }
  });
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  // ---- STYLES
  const sectionStyle = ctl(`
    grid 
    grid-cols-1 
    gap-5 
    p-4 
    mt-8 
    mb-20 
    overflow-x-hidden 
    rounded-md
  `);

  // ---- JSX
  return (
    <section className={sectionStyle}>
      {notes?.map((note) => {
        if (note.has_children) {
          return <NoteCardHasChildren key={note.id} note={note} />;
        } else {
          return <NoteCard key={note.id} note={note} noteType={"default"} />;
        }
      })}
    </section>
  );
}

export default NotesList;
