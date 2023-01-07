export interface NoteType {
    id: string
    title: string
    checked: boolean
    created_at: string
    parent: SectionType
    has_children: boolean
    who: 'Abdel' | 'Belkys'
    where: 'Marruecos' | 'Ecuador'
}

export interface SectionType {
    id: string,
    title: string
}

export interface NotesBySectionType {
    sectionTitle: string;
    sectionNotes: NoteType[]
}

export type SubNoteType = Omit<NoteType, 'has_children'>

export type FilterType = {
    estado: boolean | null;
    quien: "Abdel" | "Belkys" | null;
    donde: "MA" | "EC" | null;
};

export type FilterArrType = {
    estado: boolean[];
    quien: string[];
    donde: string[];
};