import ctl from "@netlify/classnames-template-literals";
import { useDispatch, useSelector } from "../context/useProvider";

export default function Overlay() {
  // ---- HOOKS
  const { member } = useSelector();
  const dispatch = useDispatch();

  // ---- FUNCTIONS
  const closeOverlay = () => {
    dispatch({ type: "SET_MODAL_SHOW", payload: false });
    dispatch({ type: "SET_DRAWER_SHOW", payload: false });
    dispatch({ type: "SET_MEMBER", payload: "" });
    document.body.style.overflow = "auto";
  };

  // ---- STYLES
  const overlay = ctl(`
    fixed 
    inset-0 
    z-40
    backdrop-blur-sm
    ${
      member === "section"
        ? `bg-blue-900/50 backdrop-brightness-50`
        : member === "note"
        ? `bg-orange-900/50 backdrop-brightness-50`
        : member === "subNote"
        ? `bg-cyan-900/50 backdrop-brightness-50`
        : `bg-black/50 backdrop-brightness-50`
    }
  `);

  // ---- JSX
  return <div className={overlay} onClick={closeOverlay} />;
}
