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


class Account extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>
					<form style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center"
					}}>
						<Avatar alt="Sexy profile picture" src="http://localhost:3000/avatar.jpg"/>
						<TextField id="email" label="E-mail"/>
						<TextField id="name" label="Name"/>
						<FormControl>
							<InputLabel>Gender</InputLabel>
							<Select id="gender">
								<MenuItem>Man</MenuItem>
								<MenuItem>Woman</MenuItem>
							</Select>
							<FormHelperText>Helper text</FormHelperText>
						</FormControl>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker>
							</KeyboardDatePicker>
						</MuiPickersUtilsProvider>
						<Button variant="contained" color="secondary" startIcon={<EmojiPeopleIcon/>}>Update
							details</Button>
						<Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}>Delete account</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Account;
