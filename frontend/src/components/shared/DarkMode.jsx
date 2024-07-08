import React, { useState, useEffect } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

function DarkMode() {
    const [dark, setDark] = useState(() => {
        // Check local storage for dark mode preference
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const darkModeHandler = () => {
        setDark(prevDark => {
            const newDark = !prevDark;
            document.body.classList.toggle("dark", newDark);
            localStorage.setItem("darkMode", JSON.stringify(newDark));
            return newDark;
        });
    };

    useEffect(() => {
        if (dark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [dark]);

    return (
            <button onClick={darkModeHandler} className="md:text-3xl sm:text-2xl text-xl m-1">
                {dark ? <IoSunny /> : <IoMoon className="text-ternary-dark" />}
            </button>
    );
}

export default DarkMode;
