import { useQuery } from "react-query";
import { useDispatch } from "../context/useProvider";
import { SectionType } from "../Types";
import { supabase } from "../utils/supabaseClient";
import SectionCard from "./SectionCard";
import { useEffect } from "react";

const getSections = async () => {
  const {
    data: sections,
    error: secError,
  }: { data: SectionType[] | null; error: any } = await supabase
    .from("sections")
    .select("*");
  if (secError) throw new Error("error getting notes");
  if (!sections) return [];
  return sections as SectionType[];
};

function SectionsList() {
  const dispatch = useDispatch();
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery("sections", () => getSections());

  if (isError) return <p className="text-center">Error ...</p>;
  if (isLoading) return <p className="text-center">Loading ...</p>;
  return (
    <main className="flex p-4 space-x-4 overflow-auto mt-28 scrollbar-hide ">
      {sections?.map((section, i) => {
        return <SectionCard key={section.id} section={section} />;
      })}
    </main>
  );
}

export default SectionsList;
