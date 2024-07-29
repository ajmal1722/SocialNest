import { useState } from "react"

const NavigationButton = ({ navOptions, activeLink, setActiveLink }) => {

    return (
        <div className="flex justify-center my-5 gap-2">
            {navOptions.map(option => (
                <button
                    key={option}
                    onClick={() => setActiveLink(option)}
                    className={`px-4 py-1 mx-4 rounded-2xl border ${option === activeLink ? 'bg-ternary-dark dark:bg-secondary-dark text-primary-light scale-110' : 'font-semibold'}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default NavigationButton;