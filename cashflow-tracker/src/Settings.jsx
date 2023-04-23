import {Component} from "react";
import "./Settings.scss";
export default class Settings extends Component {
  constructor(props) {
    super(props);

    let spreadsheet_url = this.getCookie("spreadsheetURL");

    this.state = {
      spreadsheetURL: spreadsheet_url,
    }
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  handleSpreadsheetURLChange = (event) => {
    this.setState({spreadsheetURL: event.target.value});
    document.cookie = "spreadsheetURL=" + event.target.value + "; expires=Thu, 01 Jan 2037 00:00:00 UTC; path=/;";
  }

  render() {
    return (
      <div className="Settings">
        <h1>Settings</h1>
        <div className="spreadsheet_url">
          <label>Excel Spreadsheet URL</label>
          <input type="url" name="spreadsheet_url" id="spreadsheet_url" placeholder="https://1drv.ms/x/s!yourSpreadsheet" pattern="https://.*" value={this.state.spreadsheetURL} onChange={this.handleSpreadsheetURLChange} />
        </div>
      </div>
    )
  }
}
