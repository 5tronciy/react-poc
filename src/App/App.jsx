import React from "react";
import s from "./App.module.css";
import Header from "./Header/Header.jsx";
import Clock from "./Clock/Clock.jsx";
import image from "../assets/image.jpg";

const App = () => {
  return (
    <div>
      <Header />
      <h1>Hello, world!</h1>
      <Clock />
      <div className={s.media}>
        <img className={s.image} src={image} alt="Image" />
      </div>
    </div>
  );
};

export default App;
