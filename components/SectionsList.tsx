import { NoteType, SectionType } from "../Types";
import SectionCard from "./SectionCard";

function SectionsList({
  sections,
  notesBySection,
}: {
  sections: SectionType[];
  notesBySection: NoteType[][];
}) {
  return (
    <main className="grid grid-cols-1 gap-4 p-4 mb-16 overflow-x-hidden mt-28">
      {sections?.map((section, i) => {
        return (
          <SectionCard
            key={section.id}
            section={section}
            notes={notesBySection[i]}
          />
        );
      })}
    </main>
  );
}

export default SectionsList;
