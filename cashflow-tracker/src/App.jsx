//import logo from './logo.svg';
import './App.scss';
import Navigation from "./Navigation";
import {BrowserRouter, /*HashRouter, */Routes, Route} from "react-router-dom";
import Log from "./Log";
import Transactions from "./Transactions";
import Statistics from "./Statistics";
import Settings from "./Settings";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/CashflowTracker">
        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.jsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Log />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
