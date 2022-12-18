import { SetStateAction } from "react";
import { MdNoteAlt } from "react-icons/md";

function FAB({
  openModal,
}: {
  openModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className="fixed z-30 grid w-14 h-14 text-white rounded-full shadow-md bottom-4 right-4 bg-slate-900 place-items-center"
      onClick={() => openModal(true)}
    >
      <MdNoteAlt size="24px" />
    </button>
  );
}

export default FAB;
