import React from "react";
import Wrapper from "../../hoc/Wrapper";
import FoodControl from "./FoodControl";

const controls = [
    { label: 'هات داگ', type: 'hotDog' },
    { label: 'کاهو', type: 'lettuce' },
    { label: 'پیاز', type: 'onion' }
];

const FoodControls = (props) => {
    return (
        <Wrapper>
            <div className="grid grid-cols-12 mt-5 bg-slate-300 px-2 py-4 rounded-md">
                {controls.map(control => {
                    return <FoodControl key={control.label} label={control.label} add={() => props.addIngredient(control.type)} remove={() => props.removeIngredient(control.type)}
                    disabled={props.disabled[control.type]} />;
                })}
            </div>
            <div>
                <p className="my-4 border border-slate-600 mx-auto rounded-lg w-fit p-2">جمع فاکتور: <span>{props.price.toLocaleString('fa-IR')}</span> تومان</p>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mx-1 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={!props.purchasable} onClick={props.ordered}>{props.isLoggedIn ? 'ثبت سفارش' : 'وارد شوید'}</button>
            </div>
        </Wrapper>
    );
};

export default FoodControls;