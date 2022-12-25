import { useSelector } from "../context/useProvider";
import FilterForm from "./FilterForm";
import FilterDrawer from "./FilterForm";
import NewNote from "./NewNote";
import Overlay from "./Overlay";

function DrawerModal() {
  const { drawerShow } = useSelector();
  if (!drawerShow) return null;
  document.body.style.overflow = "hidden";
  return (
    <>
      <Overlay show={drawerShow} />
      <FilterForm />
    </>
  );
}

export default DrawerModal;
