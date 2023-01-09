import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { NoteType, SubNoteType } from "../Types";
import { supabase } from "../utils/supabaseClient";
import { useDispatch } from "../context/useProvider";
import ctl from "@netlify/classnames-template-literals";
import NoteCard from "./NoteCard";
import { MdAdd } from "react-icons/md";

const getSubNotes = async (id: string | undefined) => {
  if (!id) return null;
  const { data: subNotes, error } = await supabase
    .from("sub_todos")
    .select()
    .order("title")
    .eq("parent", id);
  if (error) throw new Error("error getting sub notes");
  if (!subNotes) return [];
  return subNotes as SubNoteType[];
};

type Props = {
  parentNote: NoteType;
  setIsNoteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SubNotesList({ parentNote, setIsNoteOpen }: Props) {
  // ---- HOOKS
  const dispatch = useDispatch();

  const {
    data: subNotes,
    isLoading,
    isError,
  } = useQuery("sub_notes", () => getSubNotes(parentNote?.id));
  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;

  // ---- FUNCTIONS
  const closeModal = () => {
    setIsNoteOpen(false);
  };

  const openNewForm = () => {
    dispatch({ type: "SET_MEMBER", payload: "subNote" });
    dispatch({ type: "SET_SELECTED_NOTE", payload: parentNote });
    dispatch({ type: "SET_MODAL_SHOW", payload: true });
  };

  // ---- STYLES
  const s = {
    overlay: ctl(`
      fixed 
      inset-0 
      z-40 
      bg-black/50 
    `),
    container: ctl(`
      fixed
      overflow-y-scroll
      bottom-0 
      left-0 
      z-40 
      flex 
      flex-col 
      items-center 
      w-full 
      px-4 
      pt-16 
      pb-12 
      mt-1 
      space-y-4 
      scrollbar-hide
      border 
      bg-gray-50 
      rounded-t-xl
      h-2/3 
      border-slate-200

    `),
    heading: ctl(`
      absolute 
      flex
      items-center
      justify-between
      top-0 
      w-full 
      p-4 
      -translate-x-1/2 
      rounded 
      left-1/2
      bg-gray-50
      text-slate-900 
    `),
    title: ctl(`
      text-xl 
      font-semibold 
      tracking-wider 
    `),
  };

  // ---- JSX
  return (
    <>
      <div className={s.overlay} onClick={closeModal} />
      <motion.div
        title="Container"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        className={s.container}
      >
        <div title="Heading" className={s.heading}>
          <p className={s.title}>{parentNote.title}</p>
          <button onClick={openNewForm}>
            <MdAdd size="24px" />
          </button>
        </div>
        {subNotes?.length === 0 ? (
          <p className="text-gray-500">No hay tramites aun!</p>
        ) : (
          subNotes?.map((subNote) => (
            <NoteCard key={subNote.id} note={subNote} noteType={"sub"} />
          ))
        )}
      </motion.div>
    </>
  );
}
