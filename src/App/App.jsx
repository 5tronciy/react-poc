import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import Home from "./Home";
import Shooting from "./Shooting";
import Nhl from "./NHL/NHL";
import "./App.less";

const App = () => {
  const [state, setState] = useState("nhl");
  const handleItemClick = (e, { name }) => setState(name);
  return (
    <div>
      <Menu>
        <Menu.Item
          name="home"
          active={state === "home"}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="shooting"
          active={state === "shooting"}
          onClick={handleItemClick}
        >
          Shooting
        </Menu.Item>
        <Menu.Item
          name="nhl"
          active={state === "nhl"}
          onClick={handleItemClick}
        >
          NHL
        </Menu.Item>
      </Menu>
      {state === "home" && <Home />}
      {state === "shooting" && <Shooting />}
      {state === "nhl" && <Nhl />}
    </div>
  );
};

export default App;
