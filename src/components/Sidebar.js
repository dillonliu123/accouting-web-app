import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
    root: {
        anchor: "left",
        width: "200px"
    }
}))

const bar = (
    <div>
        <Divider />

        <ListItem button key="Home">
            <ListItemText primary="Home" />
        </ListItem>

        <Divider />
        <List>
            {["Accounts", "Transactions"].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {["Balance Sheet", "Income Statement", "Trial Balance", "Ledgers"].map((text) => (
                <ListItem button key={text}>
                    <ListItemText primary = {text} />
                </ListItem>
            ))}
        </List>
    </div>
)

function Sidebar() {
    const classes = useStyles();

    return (
        <div>
            <nav className={classes.root}>
                {bar}
            </nav>
        </div>
    )
}

export default Sidebar