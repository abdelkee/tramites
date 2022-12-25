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
import { useQueryClient } from "react-query";
import { useDispatch } from "../context/useProvider";

function Header() {
  const dispatch = useDispatch();
  //   {
  //   completed,
  //   pending,
  // }: {
  //   completed: number;
  //   pending: number;
  // }

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
        <p>3</p>
      </section>
      <section className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-8 h-8 bg-green-500 border border-green-700 rounded-full text-slate-50 ">
          <MdCheckCircle size="24px" />
        </div>
        <p>0</p>
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
