import { useSelector } from "../context/useProvider";
import NewNote from "./NewNote";
import Overlay from "./Overlay";

function Modal() {
  const { modalShow } = useSelector();
  if (!modalShow) return null;
  document.body.style.overflow = "hidden";
  return (
    <>
      {modalShow && <Overlay />}
      <NewNote />
    </>
  );
}

export default Modal;
