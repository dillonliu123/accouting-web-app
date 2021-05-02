import React from 'react'
import Title from "../Title";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";

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

const RetainedEarningsStatementTitle = (props) => {
    return (
        <>
            <TableRow>
                <TableCell colSpan={2} align={"center"}>{props.companyName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align={"center"}>Retained Earnings Statement</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2} align={"center"}>{"For the Month Ended " + props.date}</TableCell>
            </TableRow>
        </>
    )
}

const RetainedEarningsStatementBody = (props) => {
    const classes = useStyles()
    let netIncome = 0
    props.accounts.revenues.forEach(item => {
        netIncome += item.money
    })
    props.accounts.expenses.forEach(item => {
        netIncome -= item.money
    })

    return (
        <>
            <TableRow>
                <TableCell align={"left"}>{"Retained Earnings, " + props.date.substr(0,props.date.indexOf(" ")) + " 1"}</TableCell>
                <TableCell align={"right"}>{"$" + props.accounts.equity[2].money}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align={"left"}>Add: Net Income</TableCell>
                <TableCell align={"right"}>{"$" + netIncome}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell />
                <TableCell className={classes.subTotal} align={"right"}>{"$" + (props.accounts.equity[2].money+netIncome)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align={"left"}>Less: Dividends</TableCell>
                <TableCell align={"right"}>{"$" + props.accounts.equity[1].money}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align={"left"}>{"Retained Earnings, " + props.date}</TableCell>
                <TableCell align={"right"} className={classes.total}>{"$" + (props.accounts.equity[2].money + netIncome - props.accounts.equity[1].money)}</TableCell>
            </TableRow>
        </>
    )
}

function RetainedEarningsStatement(props) {
    const classes = useStyles()
    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Retained Earnings Statement"} />
            <Table className={classes.table}>
                <RetainedEarningsStatementTitle companyName={props.companyName} date={props.date}/>
                <RetainedEarningsStatementBody date={props.date} accounts={props.accounts}/>
            </Table>
        </div>
    )
}

export default RetainedEarningsStatement