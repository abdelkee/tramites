import { NoteType, SectionType, SubNoteType } from "../Types";
import SectionCard from "./SectionCard";

function SectionsList({ sections }: { sections: SectionType[] }) {
  return (
    <main className="flex mt-28 space-x-4 overflow-auto scrollbar-hide p-4 ">
      {sections?.map((section, i) => {
        return <SectionCard key={section.id} section={section} />;
      })}
    </main>
  );
}

export default SectionsList;
