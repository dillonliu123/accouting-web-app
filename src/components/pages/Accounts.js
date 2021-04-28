import React from "react"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import Title from "../Title"
import Button from "@material-ui/core/Button";
import AccountsList from "../AccountsList";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1)
    },
    addButton: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(5),
        fontSize: 25,
        height: 41,
        minWidth: 41
    },
    container: {
        width: "100%"
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
    },
}))


const AddingAccountForm = ({accountName, setAccountName, type, setType, money, setMoney, setAccounts, accounts}) => {
    const classes = useStyles();
    const accountNameForm = type !== "Equity" ?
        <FormControl className={classes.margin}>
            <InputLabel style={{transform: "translate(0, 1.5px) scale(0.75)"}}>Account Name</InputLabel>
            <input className={classes.input} value={accountName} onChange={(e) => {setAccountName(e.target.value)}}/>
        </FormControl>
        :
        <FormControl className={classes.margin} >
            <InputLabel>Account Name</InputLabel>
            <Select
                value={accountName}
                input={<BootstrapInput/>}
                onChange={(event) => {
                    setAccountName(event.target.value)
                }}
            >
                <MenuItem value={"Common Shares"}>Common Shares</MenuItem>
                <MenuItem value={"Dividends"}>Dividends</MenuItem>
                <MenuItem value={"Retained Earnings"}>Retained Earnings</MenuItem>
            </Select>
        </FormControl>


    return (
        <Container className={classes.container} key={"Container"}>
            {accountNameForm}

            <FormControl className={classes.margin}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={type}
                    input={<BootstrapInput/>}
                    onChange={(event) => {
                        if (event.target.value === "Equity") {
                            setAccountName("Common Shares")
                        }
                        setType(event.target.value)
                    }}
                >
                    <MenuItem value="Asset">Asset</MenuItem>
                    <MenuItem value="Liability">Liability</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                    <MenuItem value="Revenue">Revenue</MenuItem>
                    <MenuItem value="Equity">Equity</MenuItem>
                </Select>
            </FormControl>

 {/*           <FormControl className={classes.margin}>
                <InputLabel>DR/CR</InputLabel>
                <Select
                    value={drcr}
                    input={<BootstrapInput/>}
                    onChange={(event) => {
                        setdrcr(event.target.value)
                    }}
                >
                    <MenuItem value="DR">DR</MenuItem>
                    <MenuItem value="CR">CR</MenuItem>
                </Select>
            </FormControl>*/}

            <FormControl className={classes.margin}>
                <InputLabel style={{transform: "translate(0, 1.5px) scale(0.75)"}}>Amount of Money</InputLabel>
                <input
                    className={classes.input}
                    onChange={(e)=>{
                        const re = /^[0-9\b]+$/
                        if (e.target.value.charAt(0) !== '$' && re.test(e.target.value)) {
                            setMoney("$"+e.target.value)
                        }
                        else if (re.test(e.target.value.substr(1)) || (e.target.value.charAt(0) === '$' && e.target.value.substr(1) === "")) {
                            setMoney(e.target.value)
                        }
                    }}
                    value={money}
                />
            </FormControl>

            <Button
                variant={"contained"}
                color={"primary"}
                className={classes.addButton}
                onClick={(e) => {
                    let drcr = (type === "Asset" || type === "Expense" || type === "Dividends") ? "DR" : "CR"
                    let newItem = {
                        accountName: accountName,
                        type: type,
                        drcr: drcr,
                        money: Number(money.substr(1)),
                        beg: Number(money.substr(1)),
                        key: accountName
                    }
                    updateList(setAccounts, accounts, newItem, type, true)
                    setAccountName("")
                    if (type === "Equity") {
                        setAccountName("Common Shares")
                    }
                    setMoney("$")
                    e.preventDefault()
                }}
            >+</Button>
        </Container>
    )
}

export const updateList = (setAccounts, accounts, newItem, type, add) => {
    if (add) {
        if (type === "Asset") {
            setAccounts({
                assets: accounts.assets.concat(newItem),
                liabilities: accounts.liabilities,
                expenses: accounts.expenses,
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Liability") {
            setAccounts({
                assets: accounts.assets,
                liabilities: accounts.liabilities.concat(newItem),
                expenses: accounts.expenses,
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Expense") {
            setAccounts({
                assets: accounts.assets,
                liabilities: accounts.liabilities,
                expenses: accounts.expenses.concat(newItem),
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Revenue") {
            setAccounts({
                assets: accounts.assets,
                liabilities: accounts.liabilities,
                expenses: accounts.expenses,
                revenues: accounts.revenues.concat(newItem),
                equity: accounts.equity
            })
        } else if (type === "Equity") {
            const changedAccount = accounts.equity.find((item) => {
                return item.accountName === newItem.accountName
            })
            changedAccount.money = newItem.money
        }
    }
    // remove the account
    else {
        if (type === "Asset") {
            setAccounts({
                assets: newItem,
                liabilities: accounts.liabilities,
                expenses: accounts.expenses,
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Liability") {
            setAccounts({
                assets: accounts.assets,
                liabilities: newItem,
                expenses: accounts.expenses,
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Expense") {
            setAccounts({
                assets: accounts.assets,
                liabilities: accounts.liabilities,
                expenses: newItem,
                revenues: accounts.revenues,
                equity: accounts.equity
            })
        } else if (type === "Revenue") {
            setAccounts({
                assets: accounts.assets,
                liabilities: accounts.liabilities,
                expenses: accounts.expenses,
                revenues: newItem,
                equity: accounts.equity
            })
        }
    }
}

function Accounts(props) {
    const [accountName, setAccountName] = React.useState("")
    const [type, setType] = React.useState("Asset")
    const [money, setMoney] = React.useState("$")

    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Accounts"}/>
            <AddingAccountForm
                accountName={accountName}
                setAccountName={setAccountName}
                type={type}
                setType={setType}
                money={money}
                setMoney={setMoney}
                setAccounts={props.setAccounts}
                accounts={props.accounts}
            />
            <AccountsList accounts={props.accounts} setAccounts={props.setAccounts} updateList={updateList}/>
        </div>
    )
}

export default Accounts