import React from "react";
import {
    FormControlLabel,
    FormGroup,
    FormLabel,
    Checkbox
} from "@material-ui/core";

const ChecboxMenu = (props) => {
    return (
        <div>
            <FormLabel component={props.formLabelComponent}>
                {props.formLabelText}
            </FormLabel>
            <FormGroup>
                {props.menuItems.map((el) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={el.checked}
                                onChange={props.onChange}
                                name={el.name}
                                color={el.color}
                            />
                        }
                        label={el.label}
                    />
                ))}
            </FormGroup>
        </div>
    );
};

export default ChecboxMenu;
