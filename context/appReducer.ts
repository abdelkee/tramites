import { SectionType } from "../Types";

export interface AppState {
    modalShow: boolean;
    isSection: boolean;
    selectedSection?: SectionType
    revalidateNotes: boolean
    revalidateSubNotes: boolean
}

export type ActionType =
    | { type: 'SETMODALSHOW', payload: AppState['modalShow'] }
    | { type: 'SETSECTION', payload: AppState['isSection'] }
    | { type: 'SETSELECTEDSECTION', payload: AppState['selectedSection'] }
    | { type: 'REVALIDATENOTES' }
    | { type: 'REVALIDATESUBNOTES' }

function appReducer(state: AppState, action: ActionType) {
    switch (action.type) {
        case 'SETMODALSHOW':
            return {
                ...state,
                modalShow: action.payload,
            };
        case 'SETSECTION':
            return {
                ...state,
                isSection: action.payload,
            };
        case 'SETSELECTEDSECTION':
            return {
                ...state,
                selectedSection: action.payload,
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