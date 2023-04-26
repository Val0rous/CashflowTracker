import "./Navigation.scss";
import "./Navigation_desktop.scss";
import {NavLink,  useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

/**
 * Creates Navbar.
 * @returns {JSX.Element} Navbar
 * @constructor
 */
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
          <span className="icon-label">New&nbsp;Log</span>
        </button>
      </NavLink>
      <NavLink to="/transactions">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded transactions">
            list_alt
          </span>
          <span className="icon-label">Transactions</span>
        </button>
      </NavLink>
      <NavLink to="/stats">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded stats">
            leaderboard
          </span>
          <span className="icon-label">Statistics</span>
        </button>
      </NavLink>
      <NavLink to="/settings">
        <button>
          <div className="icon-background"></div>
          <span className="material-symbols-rounded settings">
            settings
          </span>
          <span className="icon-label">Settings</span>
        </button>
      </NavLink>
    </nav>
  )
}
