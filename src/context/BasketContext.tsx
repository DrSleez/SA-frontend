import { createContext, ReactNode, useContext, useState } from "react";
import Basket from "../components/Basket/Basket";

type BasketProviderProps = {
  children: ReactNode;
};

type BasketContext = {
  openBasket: () => void;
  closeBasket: () => void;
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}

export default function BasketProvider({ children }: BasketProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openBasket = () => setIsOpen(true);
  const closeBasket = () => setIsOpen(false);

  return (
    <BasketContext.Provider
      value={{
        openBasket,
        closeBasket,
      }}
    >
      {children}
      <Basket isOpen={isOpen} />
    </BasketContext.Provider>
  );
}
