import { SectionType } from "../Types";
import { useDispatch, useSelector } from "../context/useProvider";

function SectionCard({ section }: { section: SectionType }) {
  const dispatch = useDispatch();
  const { selectedSection } = useSelector();

  //* ---- FUNCTIONS
  const handleClick = () => {
    dispatch({ type: "SETSELECTEDSECTION", payload: section });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-max ${
        selectedSection?.id === section.id
          ? "bg-yellow-400 shadow-none border-yellow-500"
          : "bg-slate-50 border-slate-200 shadow-md"
      } z-20 text-slate-900 font-semibold tracking-wider items-center select-none justify-between relative w-full py-2 px-4 text-center rounded-lg border active:opacity-80`}
    >
      {section.title}
    </button>
  );
}

export default SectionCard;
