import Modal from "../components/Modal";
import FAB from "../components/FAB";
import { Toaster } from "react-hot-toast";
import SectionsList from "../components/SectionsList";
import NotesList from "../components/NotesList";
import Header from "../components/Header";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/router";
import DrawerModal from "../components/DrawerModal";

//* ---- JSX
function page() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/login");
  }, []);
  return (
    <>
      <Header />
      <SectionsList />
      <NotesList />
      <FAB />
      <Modal />
      <DrawerModal />
      <Toaster />
    </>
  );
}

export default page;
