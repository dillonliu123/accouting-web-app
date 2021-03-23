import React from "react"
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

function AccountsList({accounts, setAccounts, updateList}) {
    const generateAccountsList = (list) => {
        return (
            <>
                {list.map((item) => {
                    return (
                        <TableRow key={item.accountName} >
                            <TableCell component={"th"} scope={"row"}>{item.accountName}</TableCell>
                            <TableCell align={"right"}>{"$"+item.money}</TableCell>
                            <TableCell aligh={"right"} padding={"checkbox"}>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    style={{fontSize: 25, minWidth: 20, height: 30, width: 20, marginLeft: 50}}
                                    onClick={() => {
                                        const newList = list.filter((i) => i.accountName !== item.accountName)
                                        updateList(setAccounts, accounts, newList, item.type, false)
                                    }}
                                >-</Button>
                            </TableCell>
                        </TableRow>
                    )
                })}

            </>
        )
    }

    return (
        <div>
            <h4>Asset</h4>
            {generateAccountsList(accounts.assets)}
            <h4>Liability</h4>
            {generateAccountsList(accounts.liabilities)}
            <h4>Expense</h4>
            {generateAccountsList(accounts.expenses)}
            <h4>Revenue</h4>
            {generateAccountsList(accounts.revenues)}
            <h4>Common Shares</h4>
            {generateAccountsList(accounts.commonShares)}
        </div>
    )
}

export default AccountsList