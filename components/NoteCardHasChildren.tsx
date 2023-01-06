import { motion } from "framer-motion";
import { useState } from "react";
import Flag from "react-flagkit";
import { MdAdd, MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "../context/useProvider";
import { NoteType } from "../Types";
import SubNotesList from "./SubNotesListd";

function NoteCardHasChildren({ note }: { note: NoteType }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  //* ---- STATES
  const [isChecked, setIsChecked] = useState(note.checked);
  const [loading, setLoading] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  return (
    <>
      <div className={`relative ${isNoteOpen && "shadow-md"}`}>
        {/* //* NOTE DETAILS */}
        <motion.section
          className={`flex overflow-hidden z-20 items-center justify-between shadow relative w-full py-4 pl-6 pr-4 rounded-md ${
            isChecked ? "line-through border shadow-none" : ""
          } ${
            isNoteOpen ? "border border-slate-600 bg-slate-500" : "bg-slate-50"
          }`}
        >
          <div className="flex items-center w-3/4 space-x-3">
            <p
              className={`select-text ${
                isChecked ? "text-slate-500" : "text-slate-800"
              } ${isNoteOpen ? "text-slate-50" : ""}`}
            >
              {note.title}
            </p>
            <p className={`font-semibold ${isNoteOpen ? "text-slate-50" : ""}`}>
              0
            </p>
          </div>

          {/* //* ---- TOGGLE BUTTON SECTION */}

          <div className="flex items-center space-x-4">
            {/* //* ---- ADD SUB NOTE BUTTON */}
            {isNoteOpen && (
              <button
                className="text-slate-50"
                onClick={() => {
                  dispatch({ type: "SET_MEMBER", payload: "subNote" });
                  dispatch({ type: "SET_SELECTED_NOTE", payload: note });
                  dispatch({ type: "SET_MODAL_SHOW", payload: true });
                }}
              >
                <MdAdd size="24px" />
              </button>
            )}

            {/* //* ---- OPEN NOTE BUTTON */}
            <button
              onClick={() => setIsNoteOpen(!isNoteOpen)}
              className={`grid w-10 h-10 bg-transparent ${
                isNoteOpen ? "text-slate-50" : "text-slate-600"
              } rounded-full place-items-center`}
            >
              {!isNoteOpen ? (
                <MdArrowCircleDown size="24px" />
              ) : (
                <MdArrowCircleUp size="24px" />
              )}
            </button>
          </div>

          {/* //* ---- WHO SECTION */}
          <section
            className={`absolute -top-6 left-0 w-4 h-12 ${
              note.who === "Abdel"
                ? "bg-blue-400"
                : note.who === "Belkys"
                ? "bg-pink-400"
                : ""
            } rotate-45`}
          />

          {/* //* ---- WHERE SECTION */}
          <section className="absolute border border-gray-100 left-1 bottom-1">
            <Flag country={note.where} size={20} />
          </section>
        </motion.section>

        {/* //* ---- card body */}
        {/* {isNoteOpen && <SubNotesList parentNote={note} />} */}
        {isNoteOpen && (
          <SubNotesList parentNote={note} setIsNoteOpen={setIsNoteOpen} />
          // <SubNotesList parentNote={note} />
        )}
      </div>
    </>
  );
}

export default NoteCardHasChildren;
