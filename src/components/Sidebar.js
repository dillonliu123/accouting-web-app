import React from 'react';
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "20%",
        height: "100%"
    }
}))

const bar = (
    <div>
        <Divider />
        <Link
            to = "/Home"
            style={{
                color: "inherit",
                textDecoration: "none"
            }}
        >
            <ListItem button key="Home">
                <ListItemText primary="Home" />
            </ListItem>
        </Link>

        <Divider />

        <List>
            {["Accounts", "Transactions"].map((text) => (
                <Link
                    to={"/"+text}
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                    key={text}
                >
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <List>
            {["Retained Earnings Statement","Balance Sheet", "Income Statement", "Trial Balance", "Ledgers"].map((text) => (
                <Link
                    to = {text}
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                    key={text}
                >
                    <ListItem button key={text}>
                        <ListItemText primary = {text} />
                    </ListItem>
                </Link>
            ))}
        </List>
    </div>
)

function Sidebar() {
    const classes = useStyles();

    return (
        <nav className={classes.root}>
            {bar}
        </nav>
    )
}

export default Sidebar