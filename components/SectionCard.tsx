import { SectionType } from "../Types";
import { useDispatch, useSelector } from "../context/useProvider";
import { useEffect } from "react";

function SectionCard({ section }: { section: SectionType }) {
  const dispatch = useDispatch();
  const { selectedSection } = useSelector();

  useEffect(() => {
    if (section.title === "General") {
      dispatch({ type: "SET_SELECTED_SECTION", payload: section });
    }
  }, []);

  //* ---- FUNCTIONS
  const handleClick = () => {
    dispatch({ type: "SET_SELECTED_SECTION", payload: section });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex ${
        selectedSection?.id === section.id
          ? "bg-yellow-400 shadow-none border-yellow-500"
          : "bg-slate-50 border-slate-200 shadow-md"
      } z-20 text-slate-900 font-semibold tracking-wider items-center select-none justify-between relative w-full py-2 px-4 text-center rounded-lg border active:opacity-80`}
    >
      <p className="text-left">{section.title}</p>
    </button>
  );
}

export default SectionCard;
