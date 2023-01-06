import { FilterArrType, FilterType, NoteType, SectionType } from "../Types";

export interface AppState {
    modalShow: boolean;
    drawerShow: boolean;
    member: 'section' | 'note' | 'subNote' | '';
    selectedSection?: SectionType
    selectedNote?: NoteType,
    subNotesLength: number,
    filterValues?: FilterArrType
    openedNoteId: string
}

export type ActionType =
    | { type: 'SET_MODAL_SHOW', payload: AppState['modalShow'] }
    | { type: 'SET_DRAWER_SHOW', payload: AppState['drawerShow'] }
    | { type: 'SET_MEMBER', payload: AppState['member'] }
    | { type: 'SET_SELECTED_SECTION', payload: AppState['selectedSection'] }
    | { type: 'SET_SELECTED_NOTE', payload: AppState['selectedNote'] }
    | { type: 'SET_SUBNOTES_LENGTH', payload: AppState['subNotesLength'] }
    | { type: 'SET_FILTER_VALUES', payload: AppState['filterValues'] }
    | { type: 'SET_OPENED_NOTE_ID', payload: AppState['openedNoteId'] }

function appReducer(state: AppState, action: ActionType) {
    switch (action.type) {
        case 'SET_MODAL_SHOW':
            return {
                ...state,
                modalShow: action.payload,
            };
        case 'SET_DRAWER_SHOW':
            return {
                ...state,
                drawerShow: action.payload,
            };
        case 'SET_MEMBER':
            return {
                ...state,
                member: action.payload,
            };
        case 'SET_SELECTED_SECTION':
            return {
                ...state,
                selectedSection: action.payload,
            };
        case 'SET_SELECTED_NOTE':
            return {
                ...state,
                selectedNote: action.payload,
            };
        case 'SET_SUBNOTES_LENGTH':
            return {
                ...state,
                subNotesLength: action.payload,
            };
        case 'SET_FILTER_VALUES':
            return {
                ...state,
                filterValues: action.payload,
            };
        case 'SET_OPENED_NOTE_ID':
            return {
                ...state,
                openedNoteId: action.payload,
            };
        default:
            return state;
    }
}

export default appReducer