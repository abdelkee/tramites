import { NotesBySectionType, NoteType, SectionType } from "../Types";
import SectionCard from "./SectionCard";
import { SetStateAction } from "react";

function SectionsList({
  sections,
  notesBySection,
  openModal,
}: {
  sections: SectionType[];
  notesBySection: NoteType[][];
  openModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <main className="grid grid-cols-1 gap-4 p-4 mb-16 mt-28 overflow-x-hidden">
      {sections?.map((section, i) => {
        return (
          <SectionCard
            key={section.id}
            section={section}
            notes={notesBySection[i]}
            openModal={openModal}
          />
        );
      })}
    </main>
  );
}

export default SectionsList;
