import { createContext, ReactNode, useContext, useState } from "react";
import Basket from "../components/Basket/Basket";
import { UUID } from "crypto";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BasketProviderProps = {
  children: ReactNode;
};

type BasketItem = {
  id: UUID;
  quantity: number;
};

type BasketContext = {
  openBasket: () => void;
  closeBasket: () => void;
  basketItems: BasketItem[];
  basketQuantity: number;
  clearBasket: () => void;
  getItemQuantity: (id: UUID) => number;
  increaseBasketQuantity: (id: UUID) => void;
  decreaseBasketQuantity: (id: UUID) => void;
  removeFromBasket: (id: UUID) => void;
};

const BasketContext = createContext({} as BasketContext);

export function useBasket() {
  return useContext(BasketContext);
}

export default function BasketProvider({ children }: BasketProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [basketItems, setbasketItems] = useLocalStorage<BasketItem[]>(
    "basket",
    []
  );

  const openBasket = () => setIsOpen(true);
  const closeBasket = () => setIsOpen(false);

  const basketQuantity = basketItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: UUID) {
    return basketItems.find((item) => item.id === id)?.quantity || 0;
  }

  function clearBasket() {
    setbasketItems(basketItems.filter(() => false));
  }

  function decreaseBasketQuantity(id: UUID) {
    setbasketItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function increaseBasketQuantity(id: UUID) {
    setbasketItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromBasket(id: UUID) {
    setbasketItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <BasketContext.Provider
      value={{
        openBasket,
        closeBasket,
        basketQuantity,
        basketItems,
        clearBasket,
        getItemQuantity,
        increaseBasketQuantity,
        decreaseBasketQuantity,
        removeFromBasket,
      }}
    >
      {children}
      <Basket isOpen={isOpen} />
    </BasketContext.Provider>
  );
}
