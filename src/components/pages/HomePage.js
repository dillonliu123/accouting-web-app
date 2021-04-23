import React from 'react';
import { makeStyles } from "@material-ui/core";
import Title from "../Title";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    margin: {
        margin: theme.spacing(1)
    },
    input: {
        border: "1px solid #ced4da",
        padding: "10px 26px 10px 12px",
        position: "relative",
        fontSize: "16px",
        transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        fontFamily: "-apple-system,BlinkMacSystemFont",
        borderRadius: "4px",
        backgroundColor: "#fff",
        marginTop: 25
    }
}))

const InputField = (props) => {
    const classes = useStyles()
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