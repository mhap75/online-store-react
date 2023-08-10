import React from "react";
import Wrapper from "../../hoc/Wrapper";
import NavItem from "./NavItem";

const Hamburger = (props) => {
    return (
        <Wrapper>
            <div onClick={props.closeHamMenu} style={{ display: props.show ? 'block' : 'none' }} className="bg-sky-100 z-20 h-screen fixed inset-0 opacity-50"></div>
            <ul style={{ transform: props.show ? 'translateX(0)' : 'translate(100%)' }} className="fixed h-screen w-1/4 inset-0 z-30 bg-stone-200 pt-10 gap-3 flex flex-col transition-all duration-700">
                <NavItem link="/profile" >پروفایل</NavItem>
                <NavItem link="/support" >پشتیبانی</NavItem>
                <NavItem link="/about-us" >درباره ما</NavItem>
                <NavItem link="/checkout" >سبد خرید</NavItem>
            </ul>
        </Wrapper>
    );
};

export default Hamburger;