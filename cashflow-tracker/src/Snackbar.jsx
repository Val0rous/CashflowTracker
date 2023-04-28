import ReactDOM from "react-dom/client";
import "./Snackbar.scss";

export default function Snackbar({status, show}) {

  function removeSnackbar() {
    /*
    const snackbar = document.getElementsByClassName("snackbar_success");
    if (snackbar.length > 0) {
      snackbar[0].remove();
    }
    */
    const container = document.getElementById("snackbar_container");
    ReactDOM.createRoot(container).unmount();
  }

  /*
  function removeErrorSnackbar() {
    const snackbar = document.getElementsByClassName("snackbar_error");
    if (snackbar.length > 0) {
      snackbar[0].remove();
    }
  }
  */

  switch (status) {
    case "success":
      setTimeout(removeSnackbar, 12000);
      return (
        <div className="Snackbar snackbar_success">
          <div>
          <span className="material-symbols-rounded success">
            check_circle
          </span>
            Log created successfully.
          </div>
          <a className="success" onClick={removeSnackbar}>Got it!</a>
        </div>
      )
    case "error":
      setTimeout(removeSnackbar, 12000);
      return (
        <div className="Snackbar snackbar_error">
          <div>
          <span className="material-symbols-rounded error">
            error
          </span>
            An error occurred.
          </div>
          <a className="error" onClick={removeSnackbar}>Oh fuck!</a>
        </div>
      )
    case "warning":
      if (show) {
        return (
          <div className="Snackbar">
            <div>
              <span className="material-symbols-rounded warning">
                warning
              </span>
              Spreadsheet is not set.
            </div>
            <a className="warning" href="/CashflowTracker/settings">Go to settings</a>
          </div>
        )
      }
      break;
    default:
      return null;
  }
}
