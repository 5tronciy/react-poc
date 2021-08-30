import React from "react";
import { Input, Button } from "semantic-ui-react";

export const SearchBar = ({ tempSearch, setTempSearch, setSearch, name }) => {
  return (
    <div className={`${name}s-searchBar`}>
      <Input
        placeholder={`Find ${name}`}
        type="text"
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {
          setSearch(tempSearch);
        }}
      >
        Find
      </Button>
    </div>
  );
};
