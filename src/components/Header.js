import React from "react";
import NavItems from "./Navigation/NavItems";
import Logo from "./Logo";

const Header = (props) => {
    return (
        <header className="px-5 rounded-lg bg-amber-600 py-3 mb-5 shadow-md flex justify-between items-center">
            <nav>
                <NavItems isLoggedIn={props.isLoggedIn} toggleHamMenu={props.toggleHamMenu} />
            </nav>
            <div>
                <Logo />
            </div>
        </header>
    );
};

export default Header;