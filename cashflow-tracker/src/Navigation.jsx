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
          <div className="icon-background">
            <span className="material-symbols-rounded log">
              paid
            </span>
          </div>
          New&nbsp;Log
        </button>
      </NavLink>
      <NavLink to="/transactions">
        <button>
          <div className="icon-background">
            <span className="material-symbols-rounded transactions">
              list_alt
            </span>
          </div>
          Transactions
        </button>
      </NavLink>
      <NavLink to="/stats">
        <button>
          <div className="icon-background">
            <span className="material-symbols-rounded stats">
              leaderboard
            </span>
          </div>
          Statistics
        </button>
      </NavLink>
      <NavLink to="/settings">
        <button>
          <div className="icon-background">
            <span className="material-symbols-rounded settings">
              settings
            </span>
          </div>
          Settings
        </button>
      </NavLink>
    </nav>
  )
}
