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
import Button from "@material-ui/core/Button";
import JournalList from "../JournalList";

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
    const [selectedAccountName, setSelectedAccountName] = React.useState("Account")
    const [plusMinus, setPlusMinus] = React.useState(true)
    const [changedAmount, setChangedAmount] = React.useState("$")
    let allAccountsArr = Object.values(accounts)
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
                    value={selectedAccountName}

                    onChange={(event) => {
                        setSelectedAccountName(event.target.value)
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
                    allAccountsArr = Object.values(accounts)
                    const selectedType = allAccountsArr.find((element) => {
                        return element.find(inside => {
                            return inside.accountName === selectedAccountName
                        })
                    })[0].drcr

                    let drcr = ((selectedType === "DR" && plusMinus) || (selectedType === "CR" && !plusMinus)) ? "DR" : "CR"
                    let curTrans = {date: selectedDate, account: selectedAccountName, drcr: drcr, amount: changedAmount}
                    let newTransArr = transactions.concat(curTrans).sort((a,b) => a.date - b.date)
                    setTransactions(newTransArr)

                    changeAccountMoney(accounts, selectedAccountName, Number(changedAmount.substr(1)), plusMinus)
                }}
            >Add to Journal</Button>

        </div>
    )
}

const changeAccountMoney = (accounts, accountName, amount, increase) => {
    const allAccountsArr = Object.values(accounts)
    const changedAccount = allAccountsArr.find((element) => {
        return element.find(element => {
            return element.accountName === accountName
        })
    })[0]
    const changedAmount = increase? amount : -amount
    changedAccount.money = changedAccount.money + changedAmount
    console.log(changedAccount)
}

function Transactions(props) {
    return(
        <div style={{margin: 20, width: "80%"}}>
            <Title titleName={"Transactions"} />
            <TransactionInput transactions={props.transactions} setTransactions={props.setTransactions} accounts={props.accounts}/>
            <JournalList transactions={props.transactions} setTransactions={props.setTransactions} />
        </div>
    )
}

export default Transactions