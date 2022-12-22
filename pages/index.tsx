import Modal from "../components/Modal";
import FAB from "../components/FAB";
import { supabase } from "../utils/supabaseClient";
import { NoteType, SectionType, SubNoteType } from "../Types";
import { Toaster } from "react-hot-toast";
import SectionsList from "../components/SectionsList";
import NotesList from "../components/NotesList";
import { useEffect } from "react";
import { useDispatch } from "../context/useProvider";
import Header from "../components/Header";

//* --- --- SERVER SIDE
const getSections = async () => {
  const {
    data: sections,
    error: secError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("sections")
    .select("*");
  if (secError) return [{ error: secError.message }];
  return sections as SectionType[];
};

const getAllNotes = async () => {
  const {
    data: notes,
    error: noteError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("todos")
    .select("*");
  if (noteError) return [{ error: noteError.message }];
  return notes as NoteType[];
};

export async function getServerSideProps() {
  const sections = await getSections();
  const notes = await getAllNotes();

  return {
    props: {
      sections,
      notes,
    },
  };
}

//* ---- JSX
function page({ sections }: { sections: SectionType[] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SETSELECTEDSECTION", payload: sections[0] });
  }, []);

  return (
    <>
      {/* <Header completed={completedNotes} pending={pendingNotes} /> */}
      <Header />
      <SectionsList sections={sections} />
      <NotesList />
      <FAB />
      <Modal />
      <Toaster />
    </>
  );
}

export default page;
