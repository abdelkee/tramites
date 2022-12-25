import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";

function Overlay({ show }: { show: boolean }) {
  const { member } = useSelector();
  const dispatch = useDispatch();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={`fixed inset-0 z-40 ${
            member === "section"
              ? "bg-blue-900/50 backdrop-brightness-50"
              : member === "note"
              ? "bg-orange-900/50 backdrop-brightness-50"
              : member === "subNote"
              ? "bg-cyan-900/50 backdrop-brightness-50"
              : "bg-black/50 backdrop-brightness-50"
          } backdrop-blur-sm`}
          onClick={() => {
            dispatch({ type: "SET_MODAL_SHOW", payload: false });
            dispatch({ type: "SET_DRAWER_SHOW", payload: false });
            dispatch({ type: "SET_MEMBER", payload: "" });
            document.body.style.overflow = "auto";
          }}
        ></motion.div>
      )}
    </AnimatePresence>
  );
}

export default Overlay;
