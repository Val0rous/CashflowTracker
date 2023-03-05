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
      <NavLink to="/" end className={(url === "/" ? "active" : "")}>
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded log">
            paid
          </span>
          New&nbsp;Log
        </button>
      </NavLink>
      <NavLink to="/transactions">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded transactions">
            list_alt
          </span>
          Transactions
        </button>
      </NavLink>
      <NavLink to="/stats">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded stats">
            leaderboard
          </span>
          Statistics
        </button>
      </NavLink>
      <NavLink to="/settings">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded settings">
            settings
          </span>
          Settings
        </button>
      </NavLink>
    </nav>
  )
}
