import { SetStateAction } from "react";
import { motion } from "framer-motion";

function Overlay({
  closeModal,
}: {
  closeModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm"
      onClick={() => {
        closeModal(false);
        document.body.style.overflow = "auto";
      }}
    ></motion.div>
  );
}

export default Overlay;
