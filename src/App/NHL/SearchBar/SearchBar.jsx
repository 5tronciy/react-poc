import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import "./SearchBar.less";

export const SearchBar = ({ tempSearch, setTempSearch, setSearch, name }) => {
  return (
    <div className="searchBar">
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
