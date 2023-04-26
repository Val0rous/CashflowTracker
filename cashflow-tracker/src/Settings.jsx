import {Component} from "react";
import "./Settings.scss";
import * as utils from "./utils";

/**
 * Creates Settings page.
 */
export default class Settings extends Component {
  constructor(props) {
    super(props);

    let spreadsheet_url = utils.getCookie("spreadsheetURL");

    this.state = {
      spreadsheetURL: spreadsheet_url,
    }
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
