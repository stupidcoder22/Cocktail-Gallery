import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setsearch } = useGlobalContext();
  const searchValue = React.useRef("");

  const searchcocktail = () => {
    setsearch(searchValue.current.value);
  };

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handlesubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchcocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
