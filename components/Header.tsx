import { useEffect } from "react";
import {
  MdAccessAlarm,
  MdAccessTime,
  MdAdd,
  MdAlarm,
  MdCheckCircle,
  MdFilter,
  MdFilter1,
  MdTune,
} from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "../context/useProvider";
import { supabase } from "../utils/supabaseClient";

const getCheckedCount = async () => {
  try {
    const { data: notesStates, error: queryError } = await supabase
      .from("todos")
      .select("checked");
    if (queryError) throw new Error("error getting notes state" + queryError);
    return notesStates as Array<{ checked: boolean }>;
  } catch (error) {
    console.log(error);
  }
};

function Header() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery(
    ["notesState"],
    getCheckedCount
  );

  const pending = data?.filter(
    (noteState) => noteState.checked === false
  ).length;
  const completed = data?.filter(
    (noteState) => noteState.checked === true
  ).length;
  console.log(pending, completed);
  return (
    <header className="fixed top-0 left-0 z-30 flex items-center justify-between w-full px-8 font-semibold text-white shadow-md shadow-slate-900/30 h-14 bg-slate-700">
      <button
        className=""
        onClick={() => {
          dispatch({ type: "SET_FILTER_VALUES", payload: undefined });
          dispatch({ type: "SET_DRAWER_SHOW", payload: true });
        }}
      >
        <MdTune size={"24px"} />
      </button>
      <section className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-orange-500 border border-orange-700 rounded-full text-slate-50">
          <MdAccessTime size="24px" />
        </div>
        <p>{isLoading ? "-" : pending}</p>
      </section>
      <section className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-green-500 border border-green-700 rounded-full text-slate-50 ">
          <MdCheckCircle size="24px" />
        </div>
        <p>{isLoading ? "-" : completed}</p>
      </section>
      <button
        className=""
        onClick={() => {
          dispatch({ type: "SET_MEMBER", payload: "section" });
          dispatch({ type: "SET_MODAL_SHOW", payload: true });
        }}
      >
        <MdAdd size={"24px"} />
      </button>
    </header>
  );
}

export default Header;
