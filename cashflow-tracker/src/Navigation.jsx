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
        <button>
          <span className="material-symbols-outlined log">
            paid
          </span>
          New&nbsp;Log
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/transactions">
        <button>
          <span className="material-symbols-outlined transactions">
            format_list_bulleted
          </span>
          Transactions
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/stats">
        <button>
          <span className="material-symbols-outlined stats">
            monitoring
          </span>
          Statistics
        </button>
      </NavLink>
      <NavLink to="/CashflowTracker/settings">
        <button>
          <span className="material-symbols-outlined settings">
            settings
          </span>
          Settings
        </button>
      </NavLink>
    </nav>
  )
}
