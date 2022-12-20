import { SectionType } from "../Types";

export interface AppState {
    modalShow: boolean;
    isSection: boolean;
    selectedSection?: SectionType
}

export type ActionType =
    | { type: 'SETMODALSHOW', payload: AppState['modalShow'] }
    | { type: 'SETSECTION', payload: AppState['isSection'] }
    | { type: 'SETSELECTEDSECTION', payload: AppState['selectedSection'] }

function appReducer(state: AppState, action: ActionType) {
    const { type, payload } = action;
    switch (type) {
        case 'SETMODALSHOW':
            return {
                ...state,
                modalShow: payload,
            };
        case 'SETSECTION':
            return {
                ...state,
                isSection: payload,
            };
        case 'SETSELECTEDSECTION':
            return {
                ...state,
                selectedSection: payload,
            };
        default:
            return state;
    }
}

export default appReducer