import ctl from "@netlify/classnames-template-literals";
import { MdNoteAdd } from "react-icons/md";
import { useDispatch } from "../context/useProvider";

export default function FAB() {
  // ---- HOOKS
  const dispatch = useDispatch();

  // ---- FUNCTIONS
  const openForm = () => {
    dispatch({ type: "SET_MEMBER", payload: "note" });
    dispatch({ type: "SET_MODAL_SHOW", payload: true });
  };

  // ---- STYLES
  const container = ctl(`
    fixed 
    z-30 
    grid 
    text-white 
    rounded-full 
    shadow-md 
    w-14 h-14 
    bottom-4 
    right-4 
    md:right-1/2
    md:translate-x-1/2
    bg-slate-900 
    place-items-center
  `);

  // ---- JSX
  return (
    <button className={container} onClick={openForm}>
      <MdNoteAdd size="24px" />
    </button>
  );
}
