import { useSelector } from "../context/useProvider";
import FilterForm from "./FilterForm";
import Overlay from "./Overlay";

export default function DrawerModal() {
  const { drawerShow } = useSelector();
  if (!drawerShow) return null;
  document.body.style.overflow = "hidden";
  return (
    <>
      <Overlay />
      <FilterForm />
    </>
  );
}
