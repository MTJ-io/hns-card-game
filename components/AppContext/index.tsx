import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadImage } from "../../utils/promises";
import { CardObject } from "../Card";
import { FULL_CARDS_LIST } from "../Card/cards";

interface AppContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  card: CardObject | null;
  setCard: (card: CardObject) => void;
  loaded: boolean;
}

const AppContext = createContext<AppContextProps>({
  open: false,
  setOpen: () => false,
  card: null,
  setCard: () => false,
  loaded: false,
});

const AppContainer: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [card, setInternalCard] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const setCard = useCallback((newCard: CardObject) => {
    setInternalCard(newCard);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);
      });
    });
  }, []);

  useEffect(() => {
    Promise.all(
      FULL_CARDS_LIST.map(({ card, suit }) =>
        loadImage(`/cards/${suit}/${card}.jpg`).catch(() => true)
      )
    )
      .then(() => {
        setLoaded(true);
      })
      .catch((e) => {});
  }, []);

  return (
    <AppContext.Provider value={{ open, setOpen, card, setCard, loaded }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContainer, useAppContext };
