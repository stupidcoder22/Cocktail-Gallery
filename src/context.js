import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("a");
  const [cocktail, setcocktail] = useState([]);

  const fetchdata = useCallback(async () => {
    setloading(true);
    try {
      const resp = await fetch(`${url}${search}`);
      const data = await resp.json();

      const { drinks } = data;
      if (drinks) {
        const newcocktail = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setcocktail(newcocktail);
      } else {
        setcocktail([]);
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchdata();
  }, [search, fetchdata]);

  return (
    <AppContext.Provider value={{ loading, cocktail, setsearch }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
