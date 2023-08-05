import { useState } from "react";

export default function Avatar({ user, theme }) {

    return <div className="avatar">
        <div className={theme != "cyberpunk" ? "rounded-xl w-12" : "w-11"}>
            <img src={user.image} alt="Avatar"/>
        </div>
    </div>
}