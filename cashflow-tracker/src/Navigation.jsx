import "./Navigation.scss"
import {NavLink} from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="Navigation">
      <NavLink to="/" end>
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            paid
          </span>
          New&nbsp;Log
        </button>
      </NavLink>
      <NavLink to="/transactions">
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            format_list_bulleted
          </span>
          Transactions
        </button>
      </NavLink>
      <NavLink to="/statistics">
        <button onClick={navbar}>
          <span className="material-symbols-outlined">
            monitoring
          </span>
          Stats
        </button>
      </NavLink>
      <NavLink to="/settings">
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
