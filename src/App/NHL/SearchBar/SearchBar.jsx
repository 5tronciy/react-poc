import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import s from "./SearchBar.less";

export const SearchBar = ({ tempSearch, setTempSearch, setSearch, name }) => {
  return (
    <div className={s.searchBar}>
      <Input
        size="large"
        action={
          <Button
            icon
            onClick={() => {
              setSearch(tempSearch);
            }}
          >
            <Icon name="search" />
          </Button>
        }
        placeholder={`Find ${name}`}
        type="text"
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.currentTarget.value);
        }}
      />
    </div>
  );
};
