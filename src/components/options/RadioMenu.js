import React from "react";
import {
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";

const RadioMenu = (props) => {
    return (
        <div>
            <FormLabel
                component={props.formLabelComponent}
                required={props.required}
                style={props.formLabelStyle}
            >
                {props.formLabelText}
            </FormLabel>
            <RadioGroup
                aria-label={props.radioGroupAriaLabel}
                name={props.radioGroupName}
                value={props.radioGroupValue}
                onChange={props.radioGroupOnChange}
                style={props.style}
            >
                {props.menuItems.map((el) => (
                    <FormControlLabel
                        value={el.value}
                        control={<Radio color={el.color} />}
                        label={el.label}
                        labelPlacement={el.labelPlacement}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

export default RadioMenu;
