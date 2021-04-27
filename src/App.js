import './App.css';
import Sidebar from "./components/Sidebar";
import HomePage from "./components/pages/HomePage"
import Accounts from "./components/pages/Accounts"
import Transactions from "./components/pages/Transactions"
import BalanceSheet from "./components/pages/BalanceSheet"
import IncomeStatement from "./components/pages/IncomeStatement"
import RetainedEarningsStatement from "./components/pages/RetainedEarningsStatement"
import TrialBalance from "./components/pages/TrialBalance";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from "react";
import {format} from "date-fns";
import Ledgers from "./components/pages/Ledgers";

function App() {
    const [accounts, setAccounts] = React.useState({
        assets: [],
        liabilities: [],
        expenses: [],
        revenues: [],
        equity: [
            {
                accountName: "Common Shares",
                type: "Equity",
                drcr: "CR",
                money: 0,
                beg: 0,
                key: "Common Shares"
            },
            {
                accountName: "Dividends",
                type: "Equity",
                drcr: "DR",
                money: 0,
                beg: 0,
                key: "Dividends"
            },
            {
                accountName: "Retained Earnings",
                type: "Equity",
                drcr: "CR",
                money: 0,
                beg: 0,
                key: "Retained Earnings"
            }

        ]
    })
    const [transactions, setTransactions] = React.useState([])
    const [companyName, setCompanyName] = React.useState("XYZ Company")
    const [date, setDate] = React.useState(new Date())
    console.log(accounts)
    return (
        <Router>
            <div style={{display: "flex"}} >
                <Sidebar />
                <Switch>
                    <Route path="/Home" render={() => <HomePage accounts={accounts} setAccounts={setAccounts} companyName={companyName} setCompanyName={setCompanyName} date={date} setDate={setDate}/>} />
                    <Route path="/Accounts" render={() => <Accounts accounts={ accounts} setAccounts={setAccounts}/>} />
                    <Route path="/Transactions" render={() => <Transactions accounts={accounts} setAccounts={setAccounts} transactions={transactions} setTransactions={setTransactions}/>} />
                    <Route path="/Retained Earnings Statement" render={() => <RetainedEarningsStatement accounts={accounts} companyName={companyName} date={format(date, "MMMM dd yyyy")}/>} />
                    <Route path="/Balance Sheet" render={() => <BalanceSheet accounts={accounts} companyName={companyName} date={format(date, "MMMM dd yyyy")}/>} />
                    <Route path="/Income Statement" render={() => <IncomeStatement accounts={accounts} companyName={companyName} date={format(date, "MMMM dd yyyy")}/>} />
                    <Route path="/Trial Balance" render={() => <TrialBalance accounts={accounts} companyName={companyName} date={format(date, "MMMM dd yyyy")} />} />
                    <Route path="/Ledgers" render={() => <Ledgers accounts={accounts} transactions={transactions} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
