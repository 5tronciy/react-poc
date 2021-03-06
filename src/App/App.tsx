import * as React from "react";
import { useState, MouseEvent } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import Home from "./Home";
import Shooting from "./Shooting";
import Nhl from "./NHL/NHL";
import "./App.less";

const App = () => {
    const [state, setState] = useState<string | undefined>("nhl");

    const handleItemClick:
        | ((
              event: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
              data: MenuItemProps
          ) => void)
        | undefined = (e, data) => setState(data.name);

    return (
        <div className="app">
            <div className="menu">
                <Menu
                    color="black"
                    inverted
                    size="huge"
                    style={{ borderRadius: "0" }}
                >
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
                        <img
                            style={{ width: "34px", margin: "-1.3em 0" }}
                            src="https://www-league.nhlstatic.com/images/logos/league-dark/133-flat.svg"
                        />
                    </Menu.Item>
                </Menu>
            </div>
            <div className="container">
                {state === "home" && <Home />}
                {state === "shooting" && <Shooting />}
                {state === "nhl" && <Nhl />}
            </div>
        </div>
    );
};

export default App;
