import {useMemo} from "react";
import {CatalogCardNesting, cardThemes} from "typings/catalogCards";

export const useCheckCardTheme = (card: CatalogCardNesting | null) => {
  return useMemo(() => {
    if (!card) {
      return cardThemes.some;
    }
    if (!card.theme) {
      return cardThemes.some;
    }
    const themes = Object.entries(cardThemes).map(key => {
      if (key[0] === card.theme) {
        return key[1];
      }
      return "";
    });
    return themes.filter(el => el && el)[0];
  }, [card, card?.theme]);
};
