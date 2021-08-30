import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Home from "./Home";
import Shooting from "./Shooting";
import NHL from "./NHL/NHL";
import "./App.less";

const MenuExampleBasic = () => {
  const [state, setState] = useState({ activeItem: "nhl" });
  const handleItemClick = (e, { name }) => setState({ activeItem: name });
  return (
    <div>
      <Menu>
        <Menu.Item
          name="home"
          active={state.activeItem === "home"}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="shooting"
          active={state.activeItem === "shooting"}
          onClick={handleItemClick}
        >
          Shooting
        </Menu.Item>
        <Menu.Item
          name="nhl"
          active={state.activeItem === "nhl"}
          onClick={handleItemClick}
        >
          NHL
        </Menu.Item>
      </Menu>
      {state.activeItem === "home" && <Home />}
      {state.activeItem === "shooting" && <Shooting />}
      {state.activeItem === "nhl" && <NHL />}
    </div>
  );
};

export default MenuExampleBasic;
