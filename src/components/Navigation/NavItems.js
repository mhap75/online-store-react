import React from "react";
import NavItem from "./NavItem";
import Button  from "../UI/Button/Button";

const NavItems = (props) => {
    return (
        <ul className="flex gap-5 justify-between items-center text-white">
            <NavItem link='/'>صفحه اصلی</NavItem>
            <Button classes="py-3 px-2 rounded hover:bg-slate-800 hover:text-white" clicked={props.toggleHamMenu}>منو</Button>
            <NavItem link='/checkout'>پرداخت</NavItem>
            {!props.isLoggedIn ? (<NavItem link='/auth'>ورود</NavItem>) : (<NavItem link='/logout'>خروج</NavItem>)}
        </ul>
    );
};

export default NavItems;