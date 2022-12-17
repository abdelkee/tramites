import { SetStateAction, useState } from "react";
import { MdAdd, MdNorth } from "react-icons/md";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function NewNote({
  closeModal,
}: {
  closeModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  //* ---- STATES
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //* ---- FUNCTIONS
  const addNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title) return;
      const { error } = await supabase.from("todos").insert([{ title: title }]);
      if (error) return alert("Error creating the note!");
      toast.success("Note added successfully!");
      router.replace("/");
    } catch (error) {
      return alert("Error creating the note!");
    } finally {
      setTitle("");
      setLoading(false);
      closeModal(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <form
      className="fixed z-40 flex items-center justify-between w-10/12 space-x-2 -translate-x-1/2 top-40 left-1/2"
      onSubmit={addNote}
    >
      <input
        type="text"
        placeholder="Que tramite es ..."
        className="flex-1 p-4 rounded focus:outline-none focus:ring focus:ring-slate-500"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        disabled={!title}
        className={`grid p-4 text-white rounded bg-slate-900 place-items-center disabled:bg-slate-500`}
      >
        {!loading ? <MdAdd size="24px" /> : <MdNorth size="24px" />}
      </button>
    </form>
  );
}

export default NewNote;
