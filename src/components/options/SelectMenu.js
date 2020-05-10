import React from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

const SelectMenu = (props) => {
    return (
        <div>
            <InputLabel id={props.inputLabelId} required={props.required}>
                Gender
            </InputLabel>
            <Select
                labelId={props.selectLabelId}
                id={props.selectId}
                name={props.selectName}
                value={props.selectValue}
                onChange={props.onChange}
                style={props.selectStyle}
            >
                {props.menuItems.map((el) => (
                    <MenuItem value={el.value}>{el.option}</MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default SelectMenu;
