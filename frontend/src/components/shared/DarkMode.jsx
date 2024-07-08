import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function DarkMode() {

    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <button onClick={() => darkModeHandler()}>
            {

                dark && <IoSunny />
            }
            {
                !dark && <IoMoon />
            }
        </button>
    );
}

export default DarkMode;