import "./Navigation.scss"
import {NavLink,  useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Navigation() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <nav className="Navigation">
      <NavLink to="/CashflowTracker/" end className={(url === "/" || url === "/CashflowTracker/" ? "active" : "")}>
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            paid
          </span>
          New&nbsp;Log
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/transactions">
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            format_list_bulleted
          </span>
          Transactions
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/stats">
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            monitoring
          </span>
          Stats
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/settings">
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            settings
          </span>
          Settings
        </button>
      </NavLink>
    </nav>
  )
}

function navbar() {
  //switch page
}
