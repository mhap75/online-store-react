import React from "react";

const Input = (props) => {
    let input = null;
    let border = 'slate';
    if (!props.validity && props.shouldvalidate && props.touched) {
        border = 'red';
    }
    let classes = `form-input w-full rounded-md border border-${border}-300 py-3 pl-11 text-lg shadow-md outline-none focus:z-10`

	switch (props.inputtype) {
		case "textarea":
            input = <textarea {...props} className={classes} onChange={props.onChange} />;
			break;
		default:
            input = <input {...props} className={classes} onChange={props.onChange} />;
	}

	return (
		<div className="flex-1 space-y-2">
			<label htmlFor={props.id}>{props.label}</label>
			{input}
			<small className="hidden bg-red-300"></small>
		</div>
	);
};

export default Input;
