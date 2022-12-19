import { motion, AnimatePresence } from "framer-motion";
import {
  MdAdd,
  MdArrowCircleDown,
  MdArrowCircleUp,
  MdAutorenew,
  MdCheckCircle,
  MdDelete,
} from "react-icons/md";
import { NotesBySectionType, NoteType, SectionType } from "../Types";
import { useState, SetStateAction } from "react";
import { useRouter } from "next/router";
import NoteCard from "./NoteCard";
import NotesList from "./NotesList";

function SectionCard({
  section,
  notes,
  openModal,
}: {
  section: SectionType;
  notes: NoteType[];
  openModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  //* ---- STATES
  const [loading, setLoading] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  //* ---- FUNCTIONS
  return (
    <div className="relative bg-white rounded-lg bg-stone-100">
      {/* //* ---- card face */}
      <motion.section
        className={`flex z-20 items-center justify-between relative w-full p-4 bg-slate-600 border rounded-lg`}
      >
        <p className={`w-3/4 text-stone-50 font-semibold tracking-wider`}>
          {section.title}
        </p>
        <div className="flex space-x-4">
          {isSectionOpen && (
            <button
              className={`grid w-10 h-10 bg-transparent text-stone-50 rounded-full place-items-center`}
              onClick={() => openModal(true)}
            >
              <MdAdd size={"24px"} />
            </button>
          )}
          <button
            onClick={() => setIsSectionOpen(!isSectionOpen)}
            className={`grid w-10 h-10 bg-transparent text-stone-50 rounded-full place-items-center`}
          >
            {!isSectionOpen ? (
              <MdArrowCircleDown size="24px" />
            ) : (
              <MdArrowCircleUp size="24px" />
            )}
          </button>
        </div>
      </motion.section>

      {/* //* ---- card body */}
      <AnimatePresence>
        {isSectionOpen && <NotesList notes={notes} />}
      </AnimatePresence>
    </div>
  );
}

export default SectionCard;
