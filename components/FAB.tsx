import { MdNoteAlt } from "react-icons/md";
import { useDispatch } from "../context/useProvider";

function FAB() {
  const dispatch = useDispatch();
  return (
    <button
      className="fixed z-30 grid text-white rounded-full shadow-md w-14 h-14 bottom-4 right-4 bg-slate-900 place-items-center"
      onClick={() => {
        dispatch({ type: "SET_MEMBER", payload: "note" });
        dispatch({ type: "SET_MODAL_SHOW", payload: true });
      }}
    >
      <MdNoteAlt size="24px" />
    </button>
  );
}

export default FAB;
