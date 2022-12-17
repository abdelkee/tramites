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
  return {
    props: {
      notes,
    },
  };
}

function page({ notes }: { notes: NoteType[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Header />
      <NotesList notes={notes} />
      <FAB openModal={setModalIsOpen} />
      <Modal isOpen={modalIsOpen} closeModal={setModalIsOpen} />
      <Toaster />
    </>
  );
}

export default page;
