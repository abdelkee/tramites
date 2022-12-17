function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 flex items-center justify-between w-full px-8 font-semibold text-white shadow h-14 bg-slate-700">
      <section className="flex items-center space-x-4">
        <p>Completed :</p>
        <p className="grid w-8 h-8 bg-green-600 rounded place-items-center">
          3
        </p>
      </section>
      <section className="flex items-center space-x-4">
        <p>Pending :</p>
        <p className="grid w-8 h-8 bg-orange-600 rounded place-items-center">
          6
        </p>
      </section>
    </header>
  );
}

export default Header;
