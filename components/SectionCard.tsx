import { useEffect } from "react";
import ctl from "@netlify/classnames-template-literals";
import { SectionType } from "../Types";
import { useDispatch, useSelector } from "../context/useProvider";

type Props = {
  section: SectionType;
};

export default function SectionCard({ section }: Props) {
  // ---- HOOKS
  const dispatch = useDispatch();
  const { selectedSection } = useSelector();

  useEffect(() => {
    if (section.title === "General") {
      dispatch({ type: "SET_SELECTED_SECTION", payload: section });
    }
  }, []);

  // ---- FUNCTIONS
  const handleClick = () => {
    dispatch({ type: "SET_SELECTED_SECTION", payload: section });
  };

  // ---- STYLES
  const buttonStyle = ctl(`
  flex
  z-20 
  text-slate-900 
  font-semibold 
  tracking-wider 
  items-center 
  select-none 
  justify-between 
  relative 
  w-full 
  py-2 
  px-4 
  text-center 
  rounded-lg 
  border 
  active:opacity-80
  ${
    selectedSection?.id === section.id
      ? `
    bg-yellow-400 
    shadow-none 
    border-yellow-500
    `
      : `
    bg-slate-50 
    border-slate-200 
    shadow-md
    `
  }
`);

  // ---- JSX
  return (
    <button onClick={handleClick} className={buttonStyle}>
      <p className="text-left">{section.title}</p>
    </button>
  );
}
