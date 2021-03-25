import './App.css';
import Sidebar from "./components/Sidebar";
import HomePage from "./components/pages/HomePage"
import Accounts from "./components/pages/Accounts"
import Transactions from "./components/pages/Transactions"
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from "react";

function App() {
    const [accounts, setAccounts] = React.useState({
        assets: [],
        liabilities: [],
        expenses: [],
        revenues: [],
        commonShares: []
    })
    const [transactions, setTransactions] = React.useState([])

    return (
        <Router>
            <div style={{display: "flex"}} >
                <Sidebar />
                <Switch>
                    <Route path="/Home" render={() => <HomePage accounts={accounts} setAccounts={setAccounts}/>} />
                    <Route path="/Accounts" render={() => <Accounts accounts={ accounts} setAccounts={setAccounts}/>} />
                    <Route path="/Transactions"> <Transactions accounts={accounts} setAccounts={setAccounts} transactions={transactions} setTransactions={setTransactions}/> </Route>
                    <Route path="/Balance%20Sheet" />
                    <Route path="Income%20Statement" />
                    <Route path="Trial%20Balance" />
                    <Route path="Ledgers" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
