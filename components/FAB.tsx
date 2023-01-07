import { MdNoteAlt } from "react-icons/md";
import { useDispatch } from "../context/useProvider";

export default function FAB() {
  // ---- HOOKS
  const dispatch = useDispatch();

  // ---- FUNCTIONS
  const openForm = () => {
    dispatch({ type: "SET_MEMBER", payload: "note" });
    dispatch({ type: "SET_MODAL_SHOW", payload: true });
  };

  // ---- JSX
  return (
    <button
      className="fixed z-30 grid text-white rounded-full shadow-md w-14 h-14 bottom-4 right-4 bg-slate-900 place-items-center"
      onClick={openForm}
    >
      <MdNoteAlt size="24px" />
    </button>
  );
}
