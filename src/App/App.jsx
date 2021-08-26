import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Home from "./Home";
import Shooting from "./Shooting";

const MenuExampleBasic = () => {
  const [state, setState] = useState({ activeItem: "shooting" });
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
        <Menu.Item disabled>NHL</Menu.Item>
      </Menu>
      {state.activeItem === "home" && <Home />}
      {state.activeItem === "shooting" && <Shooting />}
    </div>
  );
};

export default MenuExampleBasic;
