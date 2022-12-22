import { NoteType, SectionType } from "../Types";

export interface AppState {
    modalShow: boolean;
    member: 'section' | 'note' | 'subNote';
    selectedSection?: SectionType
    selectedNote?: NoteType
    revalidateNotes: boolean
    revalidateSubNotes: boolean
}

export type ActionType =
    | { type: 'SETMODALSHOW', payload: AppState['modalShow'] }
    | { type: 'SETMEMBER', payload: AppState['member'] }
    | { type: 'SETSELECTEDSECTION', payload: AppState['selectedSection'] }
    | { type: 'SETSELECTEDNOTE', payload: AppState['selectedNote'] }
    | { type: 'REVALIDATENOTES' }
    | { type: 'REVALIDATESUBNOTES' }

function appReducer(state: AppState, action: ActionType) {
    switch (action.type) {
        case 'SETMODALSHOW':
            return {
                ...state,
                modalShow: action.payload,
            };
        case 'SETMEMBER':
            return {
                ...state,
                member: action.payload,
            };
        case 'SETSELECTEDSECTION':
            return {
                ...state,
                selectedSection: action.payload,
            };
        case 'SETSELECTEDNOTE':
            return {
                ...state,
                selectedNote: action.payload,
            };
        case 'REVALIDATENOTES':
            return {
                ...state,
                revalidate: !state.revalidateNotes,
            };
        case 'REVALIDATESUBNOTES':
            return {
                ...state,
                revalidate: !state.revalidateSubNotes,
            };
        default:
            return state;
    }
}

export default appReducer