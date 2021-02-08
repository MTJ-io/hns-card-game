import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CardObject } from "../Card";

interface AppContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  card: CardObject | null;
  setCard: (card: CardObject) => void;
}

const AppContext = createContext<AppContextProps>({
  open: false,
  setOpen: () => false,
  card: null,
  setCard: () => false,
});

const AppContainer: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [card, setInternalCard] = useState(null);

  const setCard = useCallback((newCard: CardObject) => {
    setInternalCard(newCard);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    });
  }, []);

  return (
    <AppContext.Provider value={{ open, setOpen, card, setCard }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContainer, useAppContext };
