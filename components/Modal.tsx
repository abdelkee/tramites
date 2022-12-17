import { SetStateAction } from "react";
import NewNote from "./NewNote";
import Overlay from "./Overlay";

function Modal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  if (!isOpen) return null;
  document.body.style.overflow = "hidden";
  return (
    <>
      <Overlay closeModal={closeModal} />
      <NewNote closeModal={closeModal} />
    </>
  );
}

export default Modal;
