import './App.css';
import Sidebar from "./components/Sidebar";
import HomePage from "./components/pages/HomePage"
import Accounts from "./components/pages/Accounts"
import Transactions from "./components/pages/Transactions"
import BalanceSheet from "./components/pages/BalanceSheet";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from "react";
import {format} from "date-fns";

function App() {
    const [accounts, setAccounts] = React.useState({
        assets: [],
        liabilities: [],
        expenses: [],
        revenues: [],
        commonShares: [],
        dividends: []
    })
    const [transactions, setTransactions] = React.useState([])
    const [companyName, setCompanyName] = React.useState("XYZ Company")
    const [date, setDate] = React.useState(new Date())

    return (
        <Router>
            <div style={{display: "flex"}} >
                <Sidebar />
                <Switch>
                    <Route path="/Home" render={() => <HomePage accounts={accounts} setAccounts={setAccounts} companyName={companyName} setCompanyName={setCompanyName} date={date} setDate={setDate}/>} />
                    <Route path="/Accounts" render={() => <Accounts accounts={ accounts} setAccounts={setAccounts}/>} />
                    <Route path="/Transactions"> <Transactions accounts={accounts} setAccounts={setAccounts} transactions={transactions} setTransactions={setTransactions}/> </Route>
                    <Route path="/Balance Sheet" render={() => <BalanceSheet accounts={accounts} companyName={companyName} date={format(date, "MMMM dd yyyy")}/>} />
                    <Route path="Income Statement" />
                    <Route path="Trial Balance" />
                    <Route path="Ledgers" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
