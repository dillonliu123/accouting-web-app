import React from 'react';
import Title from "../Title";
import FormControl from "@material-ui/core/FormControl";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";


const InputField = (props) => {
    return (
        <div>
            <FormControl>
                <TextField
                    margin={"normal"}
                    style={{marginRight: 20}}
                    label={"Company Name"}
                    value={props.companyName}
                    onChange={(event => {props.setCompanyName(event.target.value)})}
                />
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Date"
                    value={props.date}
                    onChange={(date) => {
                        props.setDate(date)
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    autoOk={true}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

function HomePage(props) {
    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Home"}/>
            <InputField companyName={props.companyName} setCompanyName={props.setCompanyName} date={props.date} setDate={props.setDate}  />
        </div>
    )
}

export default HomePage