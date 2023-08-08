import { useState } from "react";

export default function Avatar({ image, theme, className = "" }) {

    return <div className={"avatar " + className}>
        <div className={theme != "cyberpunk" && theme != "black" ? "rounded-xl w-12" : "w-11"}>
            <img src={image} alt="Avatar"/>
        </div>
    </div>
}