import React from "react"
import {makeStyles} from "@material-ui/core";
import Title from "../Title"
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles((theme) => ({
    tAccount: {
        width: 200,
        display:"inline-block",
        marginRight: 50
    },
    halfTAccount: {
        width: "50%",
        borderTop: "1px solid black",
        float: "left",
        minHeight: 0,
        padding: 10
    },
    tAccountHeading: {
        margin: "30px auto 10px auto",
        display: "block",
        width: "100%",
        textAlign: "center"
    },
    total: {
        borderTop: "1px solid black"
    }
}))

const AccountsLedger = ({accounts, transactions}) => {
    const classes = useStyles()
    return (
        <div style={{display: "flex"}}>
            {accounts.map((item) => {
                let total = item.beg
                let drArr = []
                let crArr = []
                item.drcr === "DR" ?
                    drArr.push(item.beg)
                    :
                    crArr.push(item.beg)

                transactions.forEach((trans) => {
                    if (item.accountName === trans.account) {
                        if (trans.drcr === "DR") {
                            drArr.push(trans.amount)
                            item.drcr === "DR" ? total += trans.amount : total -= trans.amount
                        }
                        else {
                            crArr.push(trans.amount)
                            item.drcr === "DR" ? total -= trans.amount : total += trans.amount
                        }
                    }
                })

                return(
                    <div className={classes.tAccount}>
                        <h4 className={classes.tAccountHeading}>{item.accountName}</h4>

                        <div style={{display: "flex"}}>
                            <div className={classes.halfTAccount} style={{borderRight: "1px solid black"}}>
                                {
                                    drArr.map((insideItem) => {
                                        return <div>{insideItem}</div>
                                    })
                                }

                            </div>
                            <div className={classes.halfTAccount}>
                                {
                                    crArr.map((insideItem) => {
                                        return <div>{insideItem}</div>
                                    })
                                }
                            </div>
                        </div>

                        <div style={{borderTop: "1px solid black", display: "flex"}}>
                            <div className={classes.halfTAccount} style={{borderRight: "1px solid black"}}>{item.drcr === "DR" ? <div>{total}</div> : null}</div>
                            <div className={classes.halfTAccount}>  {item.drcr === "CR" ? <div>{total}</div> : null}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function Ledgers(props) {
    const classes = useStyles()

    return(
        <div style={{margin: 20, width: "80%"}}>
            <Title titleName={"Ledgers"} />
            <AccountsLedger accounts={props.accounts.assets} transactions={props.transactions} />
            <AccountsLedger accounts={props.accounts.liabilities} transactions={props.transactions} />
            <AccountsLedger accounts={props.accounts.revenues} transactions={props.transactions} />
            <AccountsLedger accounts={props.accounts.expenses} transactions={props.transactions} />
            <AccountsLedger accounts={props.accounts.equity} transactions={props.transactions} />
        </div>
    )
}

export default Ledgers