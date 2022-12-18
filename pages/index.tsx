import Header from "../components/Header";
import Modal from "../components/Modal";
import NotesList from "../components/NotesList";
import FAB from "../components/FAB";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { NoteType } from "../Types";
import { Toaster } from "react-hot-toast";

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

function page({
  notes,
  completedNotes,
  pendingNotes,
}: {
  notes: NoteType[];
  completedNotes: number;
  pendingNotes: number;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Header completed={completedNotes} pending={pendingNotes} />
      <NotesList notes={notes} />
      <FAB openModal={setModalIsOpen} />
      <Modal isOpen={modalIsOpen} closeModal={setModalIsOpen} />
      <Toaster />
    </>
  );
}

export default page;
