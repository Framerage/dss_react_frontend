import React, {useState} from "react";
import SearchIcon from "assets/icons/SearchIcon.png";
import classes from "./appSearcher.module.css";
import {useForm} from "react-hook-form";

interface AppSearcherProps {
  onCreateSearchValue: (value: string) => void;
}
const AppSearcher: React.FC<AppSearcherProps> = ({onCreateSearchValue}) => {
  const {handleSubmit, register} = useForm<{searchValue: string}>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });
  const [isSearcherActive, setIsSearcherActive] = useState(false);
  const onSearchCard = (data: {searchValue: string}) =>
    onCreateSearchValue(data.searchValue);
  const onActiveSearcher = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSearcherActive(true);
  };
  return (
    <form
      className={classes.searcherContainer}
      onSubmit={handleSubmit(onSearchCard)}
    >
      {isSearcherActive ? (
        <>
          <input
            {...register("searchValue")}
            type="text"
            placeholder="search"
            name="searchValue"
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
