import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import FAB from "../components/FAB";
import SectionsList from "../components/SectionsList";
import NotesList from "../components/NotesList";
import Header from "../components/Header";
import { useAuth } from "../context/AuthProvider";
import DrawerModal from "../components/DrawerModal";

export default function page() {
  // ---- HOOKS
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.replace("/login");
  }, []);

  // ---- JSX
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
