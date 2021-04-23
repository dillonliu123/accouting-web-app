import React from 'react'
import Title from "../Title"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from "@material-ui/core";

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

const BalanceSheetTitle = (props) => {
    return (
            <>
                <TableRow>
                    <TableCell colSpan={3} align={"center"}>{props.companyName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={3} align={"center"}>Balance Sheet</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={3} align={"center"}>{props.date}</TableCell>
                </TableRow>
            </>
    )
}

const Assets = ({accounts}) => {
    const classes = useStyles()
    let total = 0
    return (
        <>
            <TableRow><TableCell colSpan={3} align={"center"} className={classes.sectionHeading}>Assets</TableCell></TableRow>
            {accounts.map(item => {
                total += item.money
                return(
                    <TableRow>
                        <TableCell>{item.accountName}</TableCell>
                        <TableCell />
                        <TableCell align={"right"}>{"$"+item.money}</TableCell>
                    </TableRow>
                )
            })}
            <TableRow><TableCell>Total Assets</TableCell><TableCell /><TableCell align="right" className={classes.total}>{"$"+total}</TableCell></TableRow>
        </>
    )
}

const LiabilitiesAndStockholdersEquity = ({accounts}) => {
    const classes = useStyles()
    let totalLiabilities = 0
    return (
        <>
            <TableRow><TableCell colSpan={3} align={"center"} className={classes.sectionHeading}>Liabilities and Stockholder's Equity</TableCell></TableRow>
            <TableRow><TableCell>Liabilities</TableCell><TableCell /><TableCell /></TableRow>
            {accounts.liabilities.map(item => {
                totalLiabilities += item.money
                return(
                    <TableRow>
                        <TableCell style={{paddingLeft: 40}}>{item.accountName}</TableCell>
                        <TableCell align={"right"}>{"$"+item.money}</TableCell>
                        <TableCell />
                    </TableRow>
                )
            })}
            <TableRow>
                <TableCell style={{paddingLeft: 70}}>Total Liabilities</TableCell>
                <TableCell className={classes.subTotal}/>
                <TableCell align="right">{"$"+totalLiabilities}</TableCell>
            </TableRow>


            <TableRow><TableCell>Stockholder's Equity</TableCell><TableCell /><TableCell /></TableRow>
            <TableRow>
                <TableCell style={{paddingLeft: 40}}>{accounts.commonShares[0].accountName}</TableCell>
                <TableCell align={"right"}>{"$"+accounts.commonShares[0].money}</TableCell>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell style={{paddingLeft: 40}}>{accounts.commonShares[0].accountName}</TableCell>
                <TableCell align={"right"}>{"$"+accounts.commonShares[0].money}</TableCell>
                <TableCell />
            </TableRow>
            <TableRow>
                <TableCell style={{paddingLeft: 70}}>Total Stockholder's Equity</TableCell>
                <TableCell className={classes.subTotal}/>
                <TableCell align="right">{"$"+totalLiabilities}</TableCell>
            </TableRow>
        </>
    )
}

function BalanceSheet(props) {
    const classes = useStyles()
    return (
        <div style={{width: "80%", margin: 20}}>
            <Title titleName={"Balance Sheet"} />
            <Table className={classes.table}>
                <BalanceSheetTitle companyName={props.companyName} date={props.date} />
                <Assets accounts={props.accounts.assets} />
                <LiabilitiesAndStockholdersEquity accounts={props.accounts} />
            </Table>
        </div>
    )
}

export default BalanceSheet