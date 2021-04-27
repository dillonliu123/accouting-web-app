import React from "react"
import {makeStyles} from "@material-ui/core";
import Title from "../Title"
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";

const useStyles = makeStyles((theme) => ({
    tAccount: {
        width: 200
    },
    halfTAccount: {
        width: "50%",
        borderTop: "1px solid black",
        float: "left",
        minHeight: 50,
        padding: 10
    },
    tAccountHeading: {
        margin: "30px auto 10px auto",
        display: "block",
        width: "20%"
    }
}))

const AccountsLedger = ({accounts, transactions}) => {
    const classes = useStyles()
    return (
        accounts.map((item) => {
            let drArr = []
            let crArr = []
            item.drcr === "DR" ?
                drArr.push(item.beg)
                :
                crArr.push(item.beg)

            transactions.forEach((trans) => {
                if (item.accountName === trans.account) {
                    if (trans.drcr === "DR")
                        drArr.push(trans.amount)
                    else
                        crArr.push(trans.amount)
                }
            })

            console.log(transactions)
            console.log(drArr)
            console.log(crArr)

            return(
                <div className={classes.tAccount}>
                    <h4 className={classes.tAccountHeading}>{item.accountName}</h4>
                    <div style={{display: "flex"}}>
                        <div className={classes.halfTAccount} style={{borderRight: "1px solid black"}}>
                            {
                                drArr.map((item) => {
                                    return <div>{item}</div>
                                })
                            }
                        </div>
                        <div className={classes.halfTAccount}>
                            {
                                crArr.map((item) => {
                                    return <div>{item}</div>
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        })
    )
}

function Ledgers(props) {
    const classes = useStyles()

    return(
        <div style={{margin: 20, width: "80%"}}>
            <Title titleName={"Ledgers"} />
            <AccountsLedger accounts={props.accounts.assets} transactions={props.transactions} />
        </div>
    )
}

export default Ledgers