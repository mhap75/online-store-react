import React from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
    return (
        <li className="py-3 px-2 rounded hover:bg-slate-800 hover:text-white">
            <NavLink onClick={props.clicked} to={props.link} className={({ isActive }) =>
                isActive ? classes.active : ""
            } end>
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavItem;