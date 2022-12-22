import Modal from "../components/Modal";
import FAB from "../components/FAB";
import { supabase } from "../utils/supabaseClient";
import { NoteType, SectionType, SubNoteType } from "../Types";
import { Toaster } from "react-hot-toast";
import SectionsList from "../components/SectionsList";
import SectionHeader from "../components/SectionHeader";
import NotesList from "../components/NotesList";
import { useEffect } from "react";
import { useDispatch } from "../context/useProvider";

//* --- --- SERVER SIDE
const getSections = async () => {
  const {
    data: sections,
    error: secError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("sections")
    .select("*")
    .order("title");
  if (secError) return [{ error: secError.message }];
  return sections as SectionType[];
};

const getAllNotes = async () => {
  const {
    data: notes,
    error: noteError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("todos")
    .select("*")
    .order("title");
  if (noteError) return [{ error: noteError.message }];
  return notes as NoteType[];
};

const getNotes = async (section_id: string) => {
  const {
    data: notes,
    error: noteError,
  }: { data: NoteType[] | null; error: any } = await supabase
    .from("todos")
    .select()
    .eq("parent", section_id)
    .order("title");
  return { notes: notes as NoteType[], noteError };
};

const getSubNotes = async (note_id: string) => {
  const {
    data: subNotes,
    error: subNoteError,
  }: { data: SubNoteType[] | null; error: any } = await supabase
    .from("sub_todos")
    .select()
    .eq("parent", note_id)
    .order("title");
  return { subNotes: subNotes as SubNoteType[], subNoteError };
};

export async function getServerSideProps() {
  const sections = await getSections();
  const notes = await getAllNotes();
  // if (secError) throw new Error(secError.message);
  // const { notes, noteError } = await getAllNotes();
  // if (noteError) throw new Error(noteError.message);

  // const notesBySection = await Promise.all(
  //   sections.map(async (section) => {
  //     const { notes, noteError } = await getNotes(section.id);
  //     if (noteError) throw new Error(noteError.message);
  //     return notes;
  //   })
  // );

  // const subNotesByNote = await Promise.all(
  //   notes.map(async (note) => {
  //     const { subNotes, subNoteError } = await getSubNotes(note.id);
  //     if (subNoteError) throw new Error(subNoteError.message);
  //     return subNotes;
  //   })
  // );

  return {
    props: {
      sections,
      notes,
      // subNotesByNote,
    },
  };
}

//* ---- JSX

// function page({
//   sections,
//   notes,
// }: {
//   sections: SectionType[];
//   notes: NoteType[];
// }) {
//   console.log(sections);
//   console.log(notes);
//   return <SectionHeader />;
// }

function page({
  sections,
  notes,
}: {
  sections: SectionType[];
  notes: NoteType[];
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SETSELECTEDSECTION", payload: sections[0] });
  }, []);

  return (
    <>
      {/* <Header completed={completedNotes} pending={pendingNotes} /> */}
      <SectionHeader />
      <SectionsList sections={sections} />
      <NotesList />
      <FAB />
      <Modal />
      <Toaster />
    </>
  );
}

export default page;
