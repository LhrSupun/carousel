import React from "react";
import style from "./carousel.css";

export default function Title({ title }) {
    return (
        <div className={style.centered2}>
            <h1>{title}</h1>
        </div>
    );
}
