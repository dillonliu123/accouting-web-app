import React from 'react'
import Title from "../Title";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
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


const IncomeStatementTitle = (props) => {
    return (
        <>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>{props.companyName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>Income Statement</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align={"center"}>{"For the Month Ended " + props.date}</TableCell>
            </TableRow>
        </>
    )
}

const Section = ({sectionName, accounts}) => {
    const classes = useStyles()
    let total = 0
    return (
        <>
            <TableRow><TableCell align={"left"} className={classes.sectionHeading}>{sectionName}</TableCell><TableCell /><TableCell /></TableRow>
            {accounts.map(item => {
                total += item.money
                return(
                    <TableRow>
                        <TableCell style={{paddingLeft: 40}}>{item.accountName}</TableCell>
                        <TableCell align={"right"}>{"$"+item.money}</TableCell>
                        <TableCell />
                    </TableRow>
                )
            })
            }
            <TableRow><TableCell>{"Total " + sectionName}</TableCell><TableCell className={classes.subTotal}/><TableCell align="right">{"$"+total}</TableCell></TableRow>
        </>
    )
}


function IncomeStatement(props) {
    const classes = useStyles()
    let netIncome = 0
    props.accounts.revenues.forEach(item => {
        netIncome += item.money
    })
    props.accounts.expenses.forEach(item => {
        netIncome -= item.money
    })

    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Income Statement"} />
            <Table className={classes.table}>
                <IncomeStatementTitle companyName={props.companyName} date={props.date} />
                <Section sectionName={"Revenue"} accounts={props.accounts.revenues} />
                <Section sectionName={"Expenses"} accounts={props.accounts.expenses} />
                <TableRow>
                    <TableCell align={"left"}>Net Income</TableCell>
                    <TableCell />
                    <TableCell align={"right"} className={classes.total}>{"$" + netIncome}</TableCell>
                </TableRow>
            </Table>
        </div>
    )
}

export default IncomeStatement