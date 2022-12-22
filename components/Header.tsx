import { MdAdd } from "react-icons/md";
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
    <header className="fixed flex-row-reverse top-0 left-0 z-30 flex items-center justify-between w-full px-8 font-semibold text-white shadow-md shadow-slate-900/30 h-14 bg-slate-700">
      {/* {completed === 0 && pending === 0 ? (
        <p className="text-center w-full">No hay tramites *-*</p>
      ) : (
        <>
          <section className="flex items-center space-x-4">
            <p>Completed :</p>
            <p className="grid w-8 h-8 bg-green-600 rounded place-items-center">
              {completed}
            </p>
          </section>
          <section className="flex items-center space-x-4">
            <p>Pending :</p>
            <p className="grid w-8 h-8 bg-orange-600 rounded place-items-center">
              {pending}
            </p>
          </section>
        </>
      )} */}
      <button
        className=""
        onClick={() => {
          dispatch({ type: "SETMEMBER", payload: "section" });
          dispatch({ type: "SETMODALSHOW", payload: true });
        }}
      >
        <MdAdd size={"24px"} />
      </button>
    </header>
  );
}

export default Header;
