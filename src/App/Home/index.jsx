import React from "react";
import Header from "./Header";
import Clock from "./Clock";
import image from "../../assets/image.jpg";
import s from "./styles.css";

const Home = () => {
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

export default Home;
