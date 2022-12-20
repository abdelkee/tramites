import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";

function Overlay() {
  const { isSection } = useSelector();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-40 ${
        isSection ? "bg-slate-900/80" : "bg-stone-900/80"
      } backdrop-blur-sm`}
      onClick={() => {
        dispatch({ type: "SETMODALSHOW", payload: false });
        document.body.style.overflow = "auto";
      }}
    ></motion.div>
  );
}

export default Overlay;
