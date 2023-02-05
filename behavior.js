import { Form, Text } from "informed";  //https://joepuzzo.github.io/informed/
import React from "react";

const SPREADSHEET_ID = "";  //from the URL of your blank Google Sheet
const CLIENT_ID = "";   //from https://console.developers.google.com/apis/credentials
const API_KEY = "";     //https://console.developers.google.com/apis/credentials
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);   //to tie the form's callback to this class
    }

    componentDidMount() {   //called automatically by React
        this.handleClientLoad();
    }

    handleClientLoad = () => {  //initialize the Google API
        gapi.load("client:auth2", this.initClient);
    }

    initClient = () => {    //provide the authentication credentials you set up in the Google developer console
        gapi.client.init({
            "apiKey": API_KEY,
            "clientId": CLIENT_ID,
            "scope": SCOPE,
            "discoveryDocs": ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
            this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
    }

    onFormSubmit(submissionValues) {
        const params = {
            //The ID of the spreadsheet to update
            spreadsheetId: SPREADSHEET_ID,
            //The A1 notation of a range to search for a logical table of data
            //Values will be appended after the last row of the table
            range: "Sheet1",
            //How the input data should be interpreted
            valueInputOption: "RAW",    //RAW = no conversion or formatting needed
            //How the input data should be inserted
            insertDataOption: "INSERT_ROWS",    //Choose OVERWRITE or INSERT_ROWS
        };

        const valueRangeBody = {
            "majorDimension": "ROWS",   //log each entry as a new row (vs column)
            "values": [submissionValues]    //convert the object's values to an array
        };

        let request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
        request.then(function (response) {
            //TODO: insert desired response behavior on submission
            console.log(response.result);
        }, function (reason) {
            console.error("error: " + reason.result.error.message);
        });
    }

    render() {
        return (
            <Form
                onSubmit={this.onFormSubmit}
            >
                <label>
                    First name:
                    <Text field="name" />
                </label>
                <button type="submit">
                    Submit
                </button>
            </Form>
        )
    }
}