import React from "react"
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Title from "../Title";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
    table: {
        width: 0,
        minWidth: 650,
        borderCollapse: "unset"
    },
    sectionHeading: {
        textDecoration: "underline"
    },
    total: {
        borderTop: "1px solid black",
        borderBottom: "double"
    },
    subTotal: {
        borderTop: "1px solid black"
    }
}))

const TrialBalanceTitle = (props) => {
    return (
        <>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>{props.companyName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>Trial Balance</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>{props.date}</TableCell>
            </TableRow>
        </>
    )
}

const TrialBalanceBody = (props) => {
    const classes = useStyles()
    let totalDr = 0
    let totalCr = 0
    props.accounts.assets.forEach((item) => {
        totalDr += item.money
    })
    props.accounts.expenses.forEach((item) => {
        totalDr += item.money
    })
    totalDr += props.accounts.equity[1].money

    props.accounts.liabilities.forEach((item) => {
        totalCr += item.money
    })
    props.accounts.revenues.forEach((item) => {
        totalCr += item.money
    })
    totalCr += props.accounts.equity[0].money + props.accounts.equity[2].money

    return (
        <>
            <TableRow>
                <TableCell align={"center"}>Accounts</TableCell>
                <TableCell align={"center"}>Debit</TableCell>
                <TableCell align={"center"}>Credit</TableCell>
            </TableRow>
            <ConvertAccountsToTableRows accounts={props.accounts.assets}/>
            <ConvertAccountsToTableRows accounts={props.accounts.liabilities}/>
            <ConvertAccountsToTableRows accounts={props.accounts.revenues}/>
            <ConvertAccountsToTableRows accounts={props.accounts.expenses}/>
            <ConvertAccountsToTableRows accounts={props.accounts.equity}/>
            <TableRow>
                <TableCell />
                <TableCell className={classes.total} align={"right"} >
                    <div>{"$" + totalDr}</div>
                </TableCell>
                <TableCell className={classes.total} align={"right"}>{"$" + totalCr}</TableCell>
            </TableRow>
        </>
    )
}

const ConvertAccountsToTableRows = ({accounts}) => {
    return (
            accounts.map((item) => {
                if (item.money !== 0) {
                    let drcr = item.drcr === "DR" ?
                        <>
                            <TableCell align={"right"}>{"$" + item.money}</TableCell>
                            <TableCell/>
                        </>
                        :
                        <>
                            <TableCell/>
                            <TableCell align={"right"}>{"$" + item.money}</TableCell>
                        </>
                    return (
                        <TableRow>
                            <TableCell>{item.accountName}</TableCell>
                            {drcr}
                        </TableRow>
                    )
                }
                return null
            })
    )
}

function TrialBalance(props) {
    const classes = useStyles()
    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Trial Balance"} />
            <Table className={classes.table}>
                <TrialBalanceTitle companyName={props.companyName} date={props.date} />
                <TrialBalanceBody accounts={props.accounts} />
            </Table>
        </div>
    )
}

export default TrialBalance