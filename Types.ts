export interface NoteType {
    id: string
    title: string
    checked: boolean
    created_at: string
    section: SectionType
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