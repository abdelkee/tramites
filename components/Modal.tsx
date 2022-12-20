import { SetStateAction } from "react";
import { useSelector } from "../context/useProvider";
import NewNote from "./NewNote";
import Overlay from "./Overlay";

function Modal() {
  const { modalShow } = useSelector();
  if (!modalShow) return null;
  document.body.style.overflow = "hidden";
  return (
    <>
      <Overlay />
      <NewNote />
    </>
  );
}

export default Modal;
