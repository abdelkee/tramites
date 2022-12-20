import { createContext, useReducer } from "react";
import appReducer, { ActionType, AppState } from "./appReducer";

const initialState: AppState = {
  modalShow: false,
  isSection: true,
  selectedSection: undefined,
};

export const AppContext = createContext<AppState>(initialState);

export const DispatchAppContext = createContext<React.Dispatch<ActionType>>(
  () => {}
);

function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={state}>
      <DispatchAppContext.Provider value={dispatch}>
        {children}
      </DispatchAppContext.Provider>
    </AppContext.Provider>
  );
}

export default ContextProvider;
