import "./Navigation.scss"

export default function Navigation() {
  return (
    <nav className="Navigation">
      <button>
        <span className="material-symbols-outlined">
          paid
        </span>
        Log
      </button>
      <button>
        <span className="material-symbols-outlined">
          format_list_bulleted
        </span>
        List
      </button>
      <button>
        <span className="material-symbols-outlined">
          monitoring
        </span>
        Stats
      </button>
      <button>
        <span className="material-symbols-outlined">
          settings
        </span>
        Settings
      </button>
    </nav>
  )
}