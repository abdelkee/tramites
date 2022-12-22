import { motion } from "framer-motion";
import { useDispatch, useSelector } from "../context/useProvider";

function Overlay() {
  const { member } = useSelector();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-40 ${
        member === "section"
          ? "bg-blue-900/50 backdrop-brightness-50"
          : member === "note"
          ? "bg-orange-900/50 backdrop-brightness-50"
          : member === "subNote"
          ? "bg-cyan-900/50 backdrop-brightness-50"
          : ""
      } backdrop-blur-sm`}
      onClick={() => {
        dispatch({ type: "SETMODALSHOW", payload: false });
        document.body.style.overflow = "auto";
      }}
    ></motion.div>
  );
}

export default Overlay;
