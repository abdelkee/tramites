function Header({
  completed,
  pending,
}: {
  completed: number;
  pending: number;
}) {
  return (
    <header className="fixed top-0 left-0 z-30 flex items-center justify-between w-full px-8 font-semibold text-white shadow-md shadow-slate-900/30 h-14 bg-slate-700">
      {completed === 0 && pending === 0 ? (
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
      )}
    </header>
  );
}

export default Header;
