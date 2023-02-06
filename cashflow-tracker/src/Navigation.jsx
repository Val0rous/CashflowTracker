import "./Navigation.scss"

export default function Navigation() {
  return (
    <nav className="Navigation">
      <button className="selected" onClick={navbar}>
        <span className="material-symbols-outlined">
          paid
        </span>
        New Log
      </button>
      <button onClick={navbar}>
        <span className="material-symbols-outlined">
          format_list_bulleted
        </span>
        Transactions
      </button>
      <button onClick={navbar}>
        <span className="material-symbols-outlined">
          monitoring
        </span>
        Stats
      </button>
      <button onClick={navbar}>
        <span className="material-symbols-outlined">
          settings
        </span>
        Settings
      </button>
    </nav>
  )
}

function navbar() {
  //switch page
}
