//Import MSAL library
import * as msal from "@azure/msal-browser";
/*
import {
  InteractionRequiredAuthError,
  InteractionStatus
} from "@azure/msal-browser";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
*/
import * as utils from "./utils";
//import {useEffect, useState} from "react";
const spreadsheet_url = utils.getCookie("spreadsheetURL");

export async function getAccessTokenByChatGPT() {
  //Initialize MSAL with your client ID and redirect URI
  const msalConfig = {
    auth: {
      clientId: "cd9fd17f-a488-4300-b900-90284a4ac3bb",
      redirectUri: /*"https://val0rant.github.io/CashflowTracker/"*/ "http://localhost:3000/CashflowTracker",
    },
  };

  const msalInstance = new msal.PublicClientApplication(msalConfig);

  //Define the scopes that your app will need to access OneDrive and Excel
  const tokenRequest = {
    scopes: ["https://graph.microsoft.com/Files.ReadWrite.All"/*, "https://graph.microsoft.com/.default"*/],
  };

  //Get an access token from MSAL
  const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest).catch(async (error) => {
    console.log(error);
    return await msalInstance.acquireTokenPopup(tokenRequest);
  });

  const accessToken = tokenResponse.accessToken;

  return accessToken;
}

/*
export async function getAccessToken() {
  const { instance, inProgress, accounts } = useMsal();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    if(!apiData && inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          //Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          //Call your API with token
          callApi(accessToken).then((response) => {
            setApiData(response);
          });
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then(function (accessTokenResponse) {
                //Acquire token interactive success
                let accessToken = accessTokenResponse.accessToken;
                //Call your API with token
                callApi(accessToken).then((response) => {
                  setApiData(response);
                });
              })
              .catch(function (error) {
                //Acquire token interactive failure
                console.log(error);
              });
          }
          console.log(error);
        });
    }
  }, [instance, accounts, inProgress, apiData]);

  return apiData;
}
*/

export async function getMetadata(accessToken) {
  //Define the URL of the shared spreadsheet
  const spreadsheetUrl = "https://1drv.ms/x/s!Ag9bHLaasvtamhJRtArcrZaB4vIc?e=c9p4pz";

  //Extract the drive ID and item ID from the URL
  //const urlParts = spreadsheetUrl.split("/");
  //const driveId = urlParts[4];
  //const itemId = urlParts[6];
  const urlParts = spreadsheetUrl.split("/s!");
  const urlPartitions = urlParts[1].split("?e=");
  const driveId = urlPartitions[0];
  const itemId = urlPartitions[1];

  //Use the OneDrive Rest API to get the metadata of the spreadsheet
  const metadataResponse = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const metadata = await metadataResponse.json();

  return metadata;
}



export async function writeData(driveId, itemId, accessToken) {
  //Define the range where you want to append the data
  const range = "Duckling!A:A";

  //Define the data to append
  const data = [["Hello World"]];

  //Use the Excel Rest API to append the data to the spreadsheet
  const appendResponse = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/workbook/worksheets('${range}')/range('A1').insert(Shift:=x1ShiftDown)`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: data,
      }),
    }
  );

  const appendResult = await appendResponse.json();

  return appendResult;
}
