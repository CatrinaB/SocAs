import React from "react";
import { Button, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";


const FORM_ITEMS_MARGIN = "10px"


class Account extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
				<div style={{ width: "40%" }}>
					<form style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						spaceBetween: "20px"
					}}>
						<Avatar alt="Sexy profile picture" src="http://localhost:3000/avatar.png"
								style={{ margin: FORM_ITEMS_MARGIN }}/>
						<TextField id="email" label="E-mail" style={{ margin: FORM_ITEMS_MARGIN }}/>
						<TextField id="name" label="Name" style={{ margin: FORM_ITEMS_MARGIN }}/>
						<FormControl style={{ margin: FORM_ITEMS_MARGIN }}>
							<InputLabel>Gender</InputLabel>
							<Select id="gender">
								<MenuItem>Man</MenuItem>
								<MenuItem>Woman</MenuItem>
							</Select>
							<FormHelperText>Helper text</FormHelperText>
						</FormControl>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker style={{ margin: FORM_ITEMS_MARGIN }}>
							</KeyboardDatePicker>
						</MuiPickersUtilsProvider>
						<Button variant="contained" color="secondary" style={{ margin: FORM_ITEMS_MARGIN }}
								startIcon={<EmojiPeopleIcon/>}>Update
							details</Button>
						<Button variant="contained" color="secondary" style={{ margin: FORM_ITEMS_MARGIN }}
								startIcon={<DeleteIcon/>}>Delete account</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Account;
