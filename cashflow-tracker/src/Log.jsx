import {Component, React} from "react";
import "./Log.scss";
import {v4 as uuidv4} from "uuid";
import ReactDOM from "react-dom/client";

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
    let spreadsheet_url = this.getCookie("spreadsheetURL");

    this.state = {
      time: time,
      date: date,
      amount: "",
      disableButton: true,
      spreadsheetURL: spreadsheet_url,
    };
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

  handleButtonStatus = (event) => {
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    let amount = document.getElementById("amount").value;
    let flag = (time === "") || (date === "") || (source === "default") || (destination === "default") || (amount === "") || (this.state.spreadsheetURL === "");
    this.setState({disableButton: flag});
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    let status = "success";
    this.createSnackbar(status);
  }

  createSnackbar(status) {
    if (status === "success") {
      const element = <Snackbar status="success" />;
      const container = document.getElementById("snackbar_container");
      const snackbar_root = ReactDOM.createRoot(container);
      snackbar_root.render(element);
    }
    if (status === "error") {
      const element = <Snackbar status="error" />;
      const container = document.getElementById("snackbar_container");
      const snackbar_root = ReactDOM.createRoot(container);
      snackbar_root.render(element);
    }
  }

  render() {
    return (
      <div className="Log">
        <h1>Create new log</h1>
        <form onSubmit={this.onFormSubmit}>
          <fieldset>
            <input
              type="radio"
              name="type"
              id="type_output"
              value="output"
              defaultChecked
            />
            <label htmlFor="type_output">
              <span className="material-symbols-rounded radio_icon output">
                north
              </span>
              <span className="radio_label">
                Output
              </span>
            </label>
            <input
              type="radio"
              name="type"
              id="type_input"
              value="input"
            />
            <label htmlFor="type_input">
              <span className="material-symbols-rounded radio_icon input">
                south
              </span>
              <span className="radio_label">
                Input
              </span>
            </label>
            <input
              type="radio"
              name="type"
              id="type_transfer"
              value="transfer"
            />
            <label htmlFor="type_transfer">
              <span className="material-symbols-rounded radio_icon transfer">
                sync_alt
              </span>
              <span className="radio_label">
                Transfer
              </span>
            </label>
          </fieldset>

          <div className="datetime">
            {/*<label htmlFor="time">Time:</label>*/}

            <input type="time" name="time" id="time" defaultValue={this.state.time} onChange={this.handleTimeChange} />
            {/*<label htmlFor="date">Date:</label>*/}
            <input type="date" name="date" id="date" defaultValue={this.state.date} onChange={this.handleDateChange} />
          </div>

          <div className="transaction">
            {/*<div className="source">*/}
              {/*<label htmlFor="source">Source</label>*/}
              <select name="source" id="source" defaultValue="default" onChange={this.handleButtonStatus}>
                <option value="default" disabled hidden>
                  Source
                </option>
                <optgroup label="Cash">
                  <option value="wallet">Wallet</option>
                  <option value="pocket">Pocket</option>
                </optgroup>
                <optgroup label="Digital">
                  <option value="satispay">Satispay</option>
                  <option value="paypal">PayPal</option>
                  <option value="hype">Hype</option>
                  <option value="revolut">Revolut</option>
                </optgroup>
                <optgroup label="Banks">
                  <option value="bcc">BCC</option>
                  <option value="intesa_sanpaolo">Intesa Sanpaolo</option>
                  <option value="unicredit">Unicredit</option>
                  <option value="bper">BPER</option>
                  <option value="n26">N26</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="extra">Extra</option>
                </optgroup>
                {/* Add option in settings to change this list completely, with a reset to default button */}
              </select>
            {/*</div>*/}

            <span className="material-symbols-rounded transaction_icon">
              east
            </span>

            {/*<div className="destination">*/}
              {/*<label htmlFor="destination">Destination</label>*/}
              <select name="destination" id="destination" defaultValue="default" onChange={this.handleButtonStatus}>
                <option value="default" disabled hidden>
                  Destination
                </option>
                {/* 1 Star */}
                <optgroup label="★">
                  <option value="bank">Bank</option>
                  <option value="car">Car</option>
                  <option value="rent">Rent</option>
                  <option value="family">Family</option>
                  <option value="fees">Fees</option>
                  <option value="food">Food</option>
                  <option value="fuel">Fuel</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="household">Household</option>
                  <option value="insurance">Insurance</option>
                  <option value="job">Job</option>
                  <option value="phone_internet">Phone/Internet</option>
                  <option value="fines">Fines</option>
                  <option value="supplements">Supplements</option>
                  <option value="transport">Transport</option>
                </optgroup>

                {/* 2 Stars */}
                <optgroup label="★★">
                  <option value="meal">Meal</option>
                  <option value="personal_care">Personal Care</option>
                  <option value="app_software">App/Software</option>
                  <option value="books">Books</option>
                  <option value="electronics">Electronics</option>
                  <option value="friends">Friends</option>
                  <option value="gifts">Gifts</option>
                  <option value="lost">Lost</option>
                  {/* Why the hell is it in 2 stars??? WDYM?? */}
                  <option value="other">Other</option>
                  <option value="shipping">Shipping</option>
                  <option value="sport">Sport</option>
                  <option value="crypto">Crypto</option>
                  <option value="accessories">Accessories</option>
                  <option value="cafe">Café</option>
                  <option value="clothing">Clothing</option>
                </optgroup>

                {/* 3 Stars */}
                <optgroup label="★★★">
                  <option value="movies">Cinema</option>
                  <option value="bet">Bet</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="fun">Fun</option>
                  <option value="gaming">Gaming</option>
                  <option value="hobby">Hobby</option>
                  <option value="hotel">Hotel</option>
                  <option value="pub">Pub</option>
                  <option value="munchies">Munchies</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="stuff">Stuff</option>
                  <option value="travel">Travel</option>
                </optgroup>
              </select>
            {/*</div>*/}
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
              <select name="currency" id="currency">
                <option value="eur">€</option>
                <option value="usd">$</option>
                <option value="gbp">£</option>
              </select>
            </div>
            <div className="preset">
              <button type="button" id="preset_amount_1" value="1" onClick={this.handlePresetClick}>1</button>
              <button type="button" id="preset_amount_2" value="2" onClick={this.handlePresetClick}>2</button>
              <button type="button" id="preset_amount_5" value="5" onClick={this.handlePresetClick}>5</button>
              <button type="button" id="preset_amount_10" value="10" onClick={this.handlePresetClick}>10</button>
              <button type="button" id="preset_amount_20" value="20" onClick={this.handlePresetClick}>20</button>
              <button type="button" id="preset_amount_50" value="50" onClick={this.handlePresetClick}>50</button>
              <button type="button" id="preset_amount_100" value="100" onClick={this.handlePresetClick}>100</button>
            </div>
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
        <div className="snackbar" id="snackbar_container">
          <Snackbar status="warning" show={this.state.spreadsheetURL === ""} />
          {/*<Snackbar status="success" show={this.state.submitStatus === "success"} />*/}
          {/*<Snackbar status="error" show={this.state.submitStatus === "error"} />*/}
          {/*this.snackbar*/}
        </div>
      </div>
    )
  }
}

function Snackbar({status, show}) {

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
          <a className="success" href="#" onClick={removeSnackbar}>Got it!</a>
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
          <a className="error" href="#" onClick={removeSnackbar}>Oh fuck!</a>
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
