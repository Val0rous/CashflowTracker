import "./Log.scss";
import {Component, createRef} from "react";
//import {v4 as uuidv4} from "uuid";
import ReactDOM from "react-dom/client";
import Snackbar from "./Snackbar";
import * as utils from "./utils";
import Source from "./Source";
import Destination from "./Destination";
import Presets from "./Presets";
import Currencies from "./Currencies";
import OperationType from "./OperationType";
import * as api from "./apiTest";

/**
 * Creates New Log page.
 */
export default class Log extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    const today = new Date();
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      //hour12: false,
      hourCycle: "h23",
    });

    const date = today.toISOString().split("T")[0];
    let spreadsheet_url = utils.getCookie("spreadsheetURL");

    this.state = {
      time: time,
      date: date,
      amount: "",
      disableButton: true,
      spreadsheetURL: spreadsheet_url,
    };

    this.snackbarContainerRef = createRef();
    this.snackbarContainer = null;
  }

  handleTimeChange = (event) => {
    this.setState({time: event.target.value});
    this.handleButtonStatus(event);
  }

  handleDateChange = (event) => {
    this.setState({date: event.target.value});
    this.handleButtonStatus(event);
  }

  handleAmountChange = (event) => {
    let old_amount = this.state.amount;
    this.setState({amount: event.target.value});
    this.selectPresetButton(event.target.value, old_amount);
    this.handleButtonStatus(event);
  }

  handlePresetClick = (event) => {
    let old_amount = this.state.amount;
    this.setState({amount: event.target.value});
    document.getElementById("amount").value = event.target.value;
    this.selectPresetButton(event.target.value, old_amount);
    navigator.vibrate(75);
    this.handleButtonStatus(event);
  }

  removeOldSelection(old_amount) {
    let old_id = "preset_amount_" + old_amount;
    if (old_amount !== "") {
      switch (old_amount) {
        case "1":
        case "2":
        case "5":
        case "10":
        case "20":
        case "50":
        case "100":
          document.getElementById(old_id).classList.remove("selected");
          break;
      }
    }
  }

  selectPresetButton(new_amount, old_amount) {
    let new_id = "preset_amount_" + new_amount;
    switch (new_amount) {
      case "1":
      case "2":
      case "5":
      case "10":
      case "20":
      case "50":
      case "100":
        this.removeOldSelection(old_amount);
        document.getElementById(new_id).classList.add("selected");
        break;
      default:
        this.removeOldSelection(old_amount);
    }
  }

  handleButtonStatus = (/*event*/) => {
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    let amount = document.getElementById("amount").value;
    let flag = (time === "") || (date === "") || (source === "default") || (destination === "default") || (amount === "") || (this.state.spreadsheetURL === "");
    this.setState({disableButton: flag});
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    let status = await this.createLog();
    //let status = "success";
    this.createSnackbar(status);
  }

  /**
   * Creates a new log in Excel spreadsheet on OneDrive, using JS REST Excel APIs.
   * @returns {string} "success" if log created successfully, "error" otherwise
   */
  async createLog() {
    /*
    let accessToken = await api.getAccessTokenByChatGPT();
    console.log("Here's the Access Token");
    console.log(accessToken);
    let metadata = await api.getMetadata(accessToken);
    console.log("Here's the Metadata");
    console.log(metadata);
    */
    return "success";
  }

  createSnackbar(status) {
    if (this.snackbarContainer === null) {
      this.snackbarContainer = document.getElementById("snackbar_container");
    }
    if (status === "success") {
      const element = <Snackbar status="success" />;
      //const container = document.getElementById("snackbar_container");
      //const snackbar_root = ReactDOM.createRoot(container);
      //snackbar_root.render(element);
      //ReactDOM.render(element, this.snackbarContainerRef.current);
      const snackbar_root = ReactDOM.createRoot(this.snackbarContainer);
      snackbar_root.render(element);
    }
    if (status === "error") {
      const element = <Snackbar status="error" />;
      //const container = document.getElementById("snackbar_container");
      //const snackbar_root = ReactDOM.createRoot(container);
      //snackbar_root.render(element);
      const snackbar_root = ReactDOM.createRoot(this.snackbarContainer);
      snackbar_root.render(element);
    }
  }

  render() {
    return (
      <div className="Log">
        <h1>Create new log</h1>
        <form onSubmit={this.onFormSubmit}>
          <OperationType />

          <div className="datetime">
            {/*<label htmlFor="time">Time:</label>*/}

            <input type="time" name="time" id="time" defaultValue={this.state.time} onChange={this.handleTimeChange} />
            {/*<label htmlFor="date">Date:</label>*/}
            <input type="date" name="date" id="date" defaultValue={this.state.date} onChange={this.handleDateChange} />
          </div>

          <div className="transaction">
            <Source on_change={this.handleButtonStatus} />

            <span className="material-symbols-rounded transaction_icon">
              east
            </span>

            <Destination on_change={this.handleButtonStatus} />
          </div>

          {/*
            * Ask bro WTH is Class in Spreadsheet
            * Asked him: it's  literally the star classification based on the
            * category of each transaction
            */}

          <div className="amount">
            <label>Amount</label>
            {/*<label htmlFor="amount">Amount</label>*/}
            <div className="custom">
              <input type="number" name="amount" id="amount" min="0" step="0.01" placeholder="0.00" value={this.state.amount} onChange={this.handleAmountChange}/>
              <Currencies />
            </div>
            <Presets on_click={this.handlePresetClick} />
          </div>

          <div className="comment">
            <input type="text" name="comment" id="comment" placeholder=" " />
            <label htmlFor="comment">Comment</label>
          </div>
          {/*<input type="submit" value="Create Log"/>*/}
          <button type="submit" disabled={this.state.disableButton}>
            <span className="material-symbols-rounded">
              list_alt_add
            </span>
            Create Log
          </button>
        </form>
        <div className="snackbar" id="snackbar_container" ref={this.snackbarContainerRef}>
          <Snackbar status="warning" show={this.state.spreadsheetURL === ""} />
          {/*<Snackbar status="success" show={this.state.submitStatus === "success"} />*/}
          {/*<Snackbar status="error" show={this.state.submitStatus === "error"} />*/}
          {/*this.snackbar*/}
        </div>
      </div>
    )
  }
}
