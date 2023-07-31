import React, {useState} from "react";
import SearchIcon from "assets/icons/SearchIcon.png";
import classes from "./appSearcher.module.css";

const AppSearcher = () => {
  const [isSearcherActive, setIsSearcherActive] = useState(false);
  const onSearchCard = (e: any) => {
    e.preventDefault();
    console.log(e.target.firstChild.value, "data");
  };
  const onActiveSearcher = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("btn is active");
    setIsSearcherActive(true);
  };
  return (
    <form
      action=""
      aria-disabled
      className={classes.searcherContainer}
      onSubmit={onSearchCard}
    >
      {isSearcherActive ? (
        <>
          <input
            type="text"
            placeholder="search"
            name="searcher"
            className={classes.searcherInput}
          />
          <img
            src={SearchIcon}
            alt="SchIcon"
            className={classes.searcherIcon}
            onClick={() => setIsSearcherActive(false)}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={onActiveSearcher}
          className={classes.searcherBtn}
        >
          Search
        </button>
      )}
    </form>
  );
};
export default AppSearcher;
