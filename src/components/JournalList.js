import React from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { format } from "date-fns"
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';

function JournalList({transactions, setTransactions, changeAccountMoney, accounts}) {
    return (
        <Table style={{minWidth: 600, width: "unset"}}>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell aligh={"right"}>Account</TableCell>
                    <TableCell aligh={"right"}>Debit</TableCell>
                    <TableCell aligh={"right"}>Credit</TableCell>
                </TableRow>
            </TableHead>
            {transactions.map((item) => {
                return (
                    <TableRow key={item.account+item.amount+item.date+item.drcr}>
                        <TableCell align={"left"}>{format(item.date, "MMM dd")}</TableCell>
                        <TableCell align={"left"}>{item.account}</TableCell>
                        <TableCell align={"right"}>{item.drcr === "DR" ? "$"+item.amount : ""}</TableCell>
                        <TableCell align={"right"}>{item.drcr === "CR" ? "$"+item.amount : ""}</TableCell>
                        <TableCell align={"right"} padding={"checkbox"}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                style={{fontSize: 25, minWidth: 20, height: 30, width: 20, marginLeft: 50}}
                                onClick={() => {
                                    const newList = transactions.filter((i) => i.key !== item.accountName || i.date !== item.date || i.amount !== item.amount || i.drcr !== item.drcr)
                                    setTransactions(newList)

                                    changeAccountMoney(accounts, item.account, Number(item.amount.substr(1)), !item.plusMinus)
                                }}
                            >-</Button>
                        </TableCell>
                    </TableRow>
                )
            })}
        </Table>
    )
}

export default JournalList