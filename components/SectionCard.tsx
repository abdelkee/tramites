import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { NoteType, SectionType } from "../Types";
import { useState } from "react";
import { useRouter } from "next/router";
import NotesList from "./NotesList";
import { useDispatch } from "../context/useProvider";

function SectionCard({
  section,
  notes,
}: {
  section: SectionType;
  notes: NoteType[];
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  //* ---- STATES
  const [loading, setLoading] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  //* ---- FUNCTIONS
  return (
    <div className="relative bg-white rounded-lg bg-slate-50">
      {/* //* ---- card face */}
      <motion.section
        className={`flex z-20 items-center justify-between relative w-full p-4 bg-slate-600 border-b-2 border-b-slate-800 rounded-lg shadow-md `}
      >
        <p className={`w-3/4 text-stone-50 font-semibold tracking-wider`}>
          {section.title}
        </p>
        <div className="flex space-x-4">
          {isSectionOpen && (
            <button
              className={`grid w-10 h-10 bg-transparent text-stone-50 rounded-full place-items-center`}
              onClick={() => {
                dispatch({ type: "SETSECTION", payload: false });
                dispatch({
                  type: "SETSELECTEDSECTION",
                  payload: section,
                });
                dispatch({ type: "SETMODALSHOW", payload: true });
              }}
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
