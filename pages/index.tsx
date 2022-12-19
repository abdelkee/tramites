import Header from "../components/Header";
import Modal from "../components/Modal";
import NotesList from "../components/NotesList";
import FAB from "../components/FAB";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { NotesBySectionType, NoteType, SectionType } from "../Types";
import { Toaster } from "react-hot-toast";
import SectionsList from "../components/SectionsList";
import SectionHeader from "../components/SectionHeader";

const getSections = async () => {
  const {
    data: sections,
    error: secError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("sections")
    .select("*")
    .order("title");
  return { sections: sections as SectionType[], secError };
};

const getNotes = async (section_id: string) => {
  const {
    data: notes,
    error: noteError,
  }: { data: NoteType[] | null; error: any } = await supabase
    .from("todos")
    .select()
    .eq("section", section_id)
    .order("title");
  return { notes: notes as NoteType[], noteError };
};

export async function getServerSideProps() {
  const { sections, secError } = await getSections();
  if (secError) throw new Error(secError.message);

  const notesBySection = await Promise.all(
    sections.map(async (section) => {
      const { notes, noteError } = await getNotes(section.id);
      if (noteError) throw new Error(noteError.message);
      return notes;
    })
  );
  return {
    props: {
      sections,
      notesBySection,
    },
  };
}

//* ---- JSX
function page({
  sections,
  notesBySection,
}: {
  sections: SectionType[];
  notesBySection: NoteType[][];
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      {/* <Header completed={completedNotes} pending={pendingNotes} /> */}
      <SectionHeader />
      <SectionsList
        sections={sections}
        notesBySection={notesBySection}
        openModal={setModalIsOpen}
      />
      <FAB openModal={setModalIsOpen} />
      <Modal isOpen={modalIsOpen} closeModal={setModalIsOpen} />
      <Toaster />
    </>
  );
}

export default page;
