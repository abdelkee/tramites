import ctl from "@netlify/classnames-template-literals";
import { MdAccessTime, MdAdd, MdCheckCircle, MdTune } from "react-icons/md";
import { useQuery } from "react-query";
import { useDispatch } from "../context/useProvider";
import { supabase } from "../utils/supabaseClient";

const getCheckedCount = async () => {
  try {
    const { data: notesStates, error: queryError } = await supabase
      .from("todos")
      .select("checked");
    const { data: subNotesStates, error: subQueryError } = await supabase
      .from("sub_todos")
      .select("checked");
    if (queryError || subQueryError)
      throw new Error(
        "error getting notes state" + queryError + " " + subQueryError
      );
    return [...notesStates, ...subNotesStates] as Array<{ checked: boolean }>;
  } catch (error) {
    console.log("checked count error", error);
  }
};

function Header() {
  // ---- HOOKS
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery(["notesState"], getCheckedCount);

  // ---- FUNCTIONS
  const openFilterDrawer = () => {
    dispatch({ type: "SET_FILTER_VALUES", payload: undefined });
    dispatch({ type: "SET_DRAWER_SHOW", payload: true });
  };
  const openNewForm = () => {
    dispatch({ type: "SET_MEMBER", payload: "section" });
    dispatch({ type: "SET_MODAL_SHOW", payload: true });
  };

  const pending = data?.filter(
    (noteState) => noteState.checked === false
  ).length;
  const completed = data?.filter(
    (noteState) => noteState.checked === true
  ).length;

  // ---- STYLES
  const s = {
    container: ctl(`
      fixed 
      top-0 
      left-0 
      md:left-1/2
      md:-translate-x-1/2
      z-30 
      flex 
      items-center 
      justify-between 
      w-full 
      max-w-md
      px-8 
      font-semibold 
      text-white 
      shadow-md 
      shadow-slate-900/30 
      h-14 
      bg-slate-700
    `),
    iconSection: ctl(`
      flex 
      items-center 
      space-x-2
    `),
    pendingIconContainer: ctl(`
      flex items-center 
      justify-center 
      w-8 
      h-8 
      bg-orange-500 
      border 
      border-orange-700 
      rounded-full 
      text-slate-50
    `),
    completedIconContainer: ctl(`
      flex items-center 
      justify-center 
      w-8 
      h-8 
      bg-green-500 
      border 
      border-green-700 
      rounded-full 
      text-slate-50
    `),
  };

  // ---- JSX
  return (
    <header className={s.container}>
      <button title="FILTER BUTTON" onClick={openFilterDrawer}>
        <MdTune size={"24px"} />
      </button>
      <section title="PENDING SECTION" className={s.iconSection}>
        <div className={s.pendingIconContainer}>
          <MdAccessTime size="24px" />
        </div>
        <p>{isLoading ? "-" : pending}</p>
      </section>
      <section title="COMPLETED SECTION" className={s.iconSection}>
        <div className={s.completedIconContainer}>
          <MdCheckCircle size="24px" />
        </div>
        <p>{isLoading ? "-" : completed}</p>
      </section>
      <button title="ADD SECTION BUTTON" onClick={openNewForm}>
        <MdAdd size={"24px"} />
      </button>
    </header>
  );
}

export default Header;
