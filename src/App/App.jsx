import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Home from "./Home";
import Shooting from "./Shooting";

const MenuExampleBasic = () => {
  const [activeItem, setActiveItem] = useState({ activeItem: "home" });
  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });
  return (
    <div>
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="shooting"
          active={activeItem === "shooting"}
          onClick={handleItemClick}
        >
          Shooting
        </Menu.Item>
        <Menu.Item
          disabled
          name="NHL"
          active={activeItem === "NHL"}
          onClick={handleItemClick}
        >
          NHL
        </Menu.Item>
      </Menu>
      {activeItem.activeItem === "home" && <Home />}
      {activeItem.activeItem === "shooting" && <Shooting />}
    </div>
  );
};

export default MenuExampleBasic;
