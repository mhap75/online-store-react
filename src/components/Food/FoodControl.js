import React from "react";

const FoodControl = (props) => {
    return (
        <div className="col-span-4">
            <div className="mb-2 bg-slate-200 shadow-sm rounded-md w-1/2 mx-auto p-1">{props.label}</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1" onClick={props.add}>اضافه</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mx-1 disabled:opacity-50 disabled:pointer-events-none" onClick={props.remove} disabled={props.disabled}>حذف</button>
        </div>
    );
};

export default FoodControl;