import { createContext, SetStateAction, useState } from "react";

interface AppContextType {
  modalIsOpen: boolean;
}

export const AppContext = createContext<AppContextType>({
  modalIsOpen: false,
});

export const DispatchAppContext = createContext<
  React.Dispatch<SetStateAction<boolean>>
>(() => {});

function ContextProvider({ children }: { children: JSX.Element }) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ modalIsOpen }}>
      <DispatchAppContext.Provider value={setModalIsOpen}>
        {children}
      </DispatchAppContext.Provider>
    </AppContext.Provider>
  );
}

export default ContextProvider;
