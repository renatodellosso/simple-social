import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import daisyui from "tailwindcss"

export default function ThemeSelect() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        setTheme(localStorage.getItem('theme') || 'dark');
    }, []);

    //Keep this up to date with the options in tailwind.config.js
    let themeOptions = [
        "dark",
        "cyberpunk",
        "light",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
      ];

    return <select value={theme} className="select" onChange={(e) => {
            console.log("Changing theme: " + e.target.value);

            localStorage.setItem('theme', e.target.value);
            setTheme(e.target.value);
            document.getElementById('mainDiv')?.setAttribute('data-theme', e.target.value); //Update the page

            toast.success("Theme changed to " + e.target.value);

            window.location.reload();
        }}>
            {themeOptions.map((themeOption) => {
               return <option key={themeOption} value={themeOption}>{themeOption.toUpperCase()}</option>
            })}
        </select>
}