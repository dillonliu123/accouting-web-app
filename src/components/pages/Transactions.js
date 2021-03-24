import React from 'react'
import Title from "../Title"
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import { format } from "date-fns"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: 16,
        marginLeft: 10
    },
    addButton: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(5),
        fontSize: 14,
        height: 32,
        minWidth: 41
    },
}))

const TransactionInput = ({transactions, setTransactions, accounts}) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    const [selectedAccount, setSelectedAccount] = React.useState("Account")
    const [plusMinus, setPlusMinus] = React.useState(true)
    const [changedAmount, setChangedAmount] = React.useState("$")
    const allAccountsArr = Object.values(accounts)
    const classes = useStyles()

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Date"
                    value={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date)
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    autoOk={true}
                />
            </MuiPickersUtilsProvider>

            <FormControl className={classes.margin} style={{minWidth: 100}}>
                <InputLabel id="accountLabel">Account</InputLabel>
                <Select
                    labelId="accountLabel"
                    value={selectedAccount}

                    onChange={(event) => {
                        setSelectedAccount(event.target.value)
                    }}
                >
                    {
                        allAccountsArr.map(arr => {
                            return arr.map(item => {
                                return <MenuItem value={item.accountName}>{item.accountName}</MenuItem>
                            })
                        })
                    }
                </Select>
            </FormControl>

            <FormControl className={classes.margin}>
                <InputLabel id={"plusMinusLabel"}>+/-</InputLabel>
                <Select
                    labelId={"plusMinusLabel"}
                    value={plusMinus}
                    onChange={event => {
                        setPlusMinus(event.target.value)
                    }}
                >
                    <MenuItem value={true}>Increase</MenuItem>
                    <MenuItem value={false}>Decrease</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.margin}>
                <TextField
                    onChange={(e)=>{
                        const re = /^[0-9\b]+$/
                        if (e.target.value.charAt(0) !== '$' && re.test(e.target.value)) {
                            setChangedAmount("$"+e.target.value)
                        }
                        else if (re.test(e.target.value.substr(1)) || (e.target.value.charAt(0) === '$' && e.target.value.substr(1) === "")) {
                            setChangedAmount(e.target.value)
                        }
                    }}
                    label={"Amount"}
                    value={changedAmount}
                />
            </FormControl>

            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.addButton}
                onClick={(e) => {
                    let curTrans = {date: format(selectedDate, "MM dd"), account: selectedAccount, increase: plusMinus, amount: changedAmount}
                    setTransactions(transactions.concat(curTrans))
                    console.log(transactions)
                }}
            >Post to Journal</Button>

        </div>
    )
}

function Transactions(props) {
    const [transactions, setTransactions] = React.useState([])

    return(
        <div style={{margin: 20, width: "80%"}}>
            <Title titleName={"Transactions"} />
            <TransactionInput transactions={transactions} setTransactions={setTransactions} accounts={props.accounts}/>
        </div>
    )
}

export default Transactions